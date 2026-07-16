package com.messlink.node_service.router;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.messlink.node_service.config.NodeProperties;
import com.messlink.node_service.connection.ConnectionManager;
import com.messlink.node_service.entity.MeshMessage;

import com.messlink.node_service.enums.MessageStatus;
import com.messlink.node_service.repository.MessageRepository;
import com.messlink.node_service.security.SignatureService;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;

@Component
public class MessageRouter {

    private final NodeProperties nodeProperties;
    private final ConnectionManager connectionManager;
    private final DedupTracker dedupTracker;
    private final StoreForwardQueue storeForwardQueue;
    private final SignatureService signatureService;
    private final MessageRepository messageRepository;
    private final ObjectMapper objectMapper;

    public MessageRouter(NodeProperties nodeProperties, ConnectionManager connectionManager,
                         DedupTracker dedupTracker, StoreForwardQueue storeForwardQueue,
                         SignatureService signatureService, MessageRepository messageRepository,
                         ObjectMapper objectMapper) {
        this.nodeProperties = nodeProperties;
        this.connectionManager = connectionManager;
        this.dedupTracker = dedupTracker;
        this.storeForwardQueue = storeForwardQueue;
        this.signatureService = signatureService;
        this.messageRepository = messageRepository;
        this.objectMapper = objectMapper;
    }


    public void route(MeshMessage message) {

        if (dedupTracker.isDuplicate(message.getMessageId())) {
            return;      }

        if (!signatureService.verify(message)) {
            message.setStatus(MessageStatus.REJECTED);
            messageRepository.save(message);
            notifyClients(message);
            return;
        }

        if (!message.getHopPath().contains(nodeProperties.getId())) {
            message.getHopPath().add(nodeProperties.getId());
        }

        if (message.getReceiverId().equals(nodeProperties.getId())) {
            message.setStatus(MessageStatus.DELIVERED);
            messageRepository.save(message);
            notifyClients(message);
            return;
        }
   if (nodeProperties.isDirectNeighbor(message.getReceiverId())) {
            relayTo(message, message.getReceiverId());
        } else {
                 String cameFrom = message.getHopPath().size() >= 2
                    ? message.getHopPath().get(message.getHopPath().size() - 2)
                    : null;

            for (NodeProperties.Neighbor neighbor : nodeProperties.getNeighbors()) {
                if (!neighbor.getId().equals(cameFrom)) {
                    relayTo(message, neighbor.getId());
                }
            }
        }
    }

    private void relayTo(MeshMessage message, String neighborId) {
        if (connectionManager.isConnected(neighborId)) {
            message.setStatus(MessageStatus.IN_TRANSIT);
            messageRepository.save(message);
            sendToPeer(message, neighborId);
            notifyClients(message);
        } else {
            storeForwardQueue.enqueue(message, neighborId);
            notifyClients(message);
        }
    }

    private void sendToPeer(MeshMessage message, String neighborId) {
        try {
            WebSocketSession session = connectionManager.getPeerSession(neighborId);
            if (session != null && session.isOpen()) {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to send message to peer " + neighborId, e);
        }
    }

       public void flushQueueFor(String neighborId) {
        List<MeshMessage> pending = storeForwardQueue.getPendingFor(neighborId);
        for (MeshMessage message : pending) {
            message.setStatus(MessageStatus.IN_TRANSIT);
            messageRepository.save(message);
            sendToPeer(message, neighborId);
            notifyClients(message);
        }
    }

    private void notifyClients(MeshMessage message) {
        try {
            String json = objectMapper.writeValueAsString(message);
            for (WebSocketSession client : connectionManager.getClientSessions()) {
                if (client.isOpen()) {
                    client.sendMessage(new TextMessage(json));
                }
            }
        } catch (IOException e) {
                   }
    }
}