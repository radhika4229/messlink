package com.messlink.node_service.websocket;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.messlink.node_service.connection.ConnectionManager;
import com.messlink.node_service.entity.MeshMessage;
import com.messlink.node_service.router.MessageRouter;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class PeerWebSocketHandler extends TextWebSocketHandler {

    private final ConnectionManager connectionManager;
    private final MessageRouter messageRouter;
    private final ObjectMapper objectMapper;

      private final ConcurrentHashMap<String, String> sessionToNeighbor = new ConcurrentHashMap<>();

    public PeerWebSocketHandler(ConnectionManager connectionManager, MessageRouter messageRouter, ObjectMapper objectMapper) {
        this.connectionManager = connectionManager;
        this.messageRouter = messageRouter;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        JsonNode node = objectMapper.readTree(message.getPayload());

        if (node.has("type") && "REGISTER".equals(node.get("type").asText())) {
            String neighborId = node.get("nodeId").asText();
            connectionManager.registerPeerSession(neighborId, session);
            sessionToNeighbor.put(session.getId(), neighborId);
            messageRouter.flushQueueFor(neighborId);
            return;
        }

        MeshMessage meshMessage = objectMapper.treeToValue(node, MeshMessage.class);
        messageRouter.route(meshMessage);
    }
    public void registerOutboundSession(String neighborId, WebSocketSession session) {
        sessionToNeighbor.put(session.getId(), neighborId);
        connectionManager.registerPeerSession(neighborId, session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        String neighborId = sessionToNeighbor.remove(session.getId());
        if (neighborId != null) {
            connectionManager.removePeerSession(neighborId);
        }
    }
}