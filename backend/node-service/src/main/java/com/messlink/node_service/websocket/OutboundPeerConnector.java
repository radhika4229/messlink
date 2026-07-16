package com.messlink.node_service.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.messlink.node_service.config.NodeProperties;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;

import java.util.HashMap;
import java.util.Map;

@Component
public class OutboundPeerConnector {

    private final NodeProperties nodeProperties;
    private final PeerWebSocketHandler peerWebSocketHandler;
    private final ObjectMapper objectMapper;

    public OutboundPeerConnector(NodeProperties nodeProperties,
                                 PeerWebSocketHandler peerWebSocketHandler,
                                 ObjectMapper objectMapper) {
        this.nodeProperties = nodeProperties;
        this.peerWebSocketHandler = peerWebSocketHandler;
        this.objectMapper = objectMapper;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void connectToNeighbors() {
        if (nodeProperties.getId() == null) {
            System.err.println("FATAL: NodeProperties not bound! " +
                    "Check profile name matches YAML filename.");
            return;
        }

        if (nodeProperties.getNeighbors() == null || nodeProperties.getNeighbors().isEmpty()) {
            System.out.println("No neighbors configured for node: " + nodeProperties.getId());
            return;
        }

        System.out.println("Connecting from node: " + nodeProperties.getId());
        StandardWebSocketClient client = new StandardWebSocketClient();

        for (NodeProperties.Neighbor neighbor : nodeProperties.getNeighbors()) {
            new Thread(() -> connectWithRetry(client, neighbor)).start();
        }
    }

    private void connectWithRetry(StandardWebSocketClient client, NodeProperties.Neighbor neighbor) {
        int maxAttempts = 10;
        long delayMs = 1000;

        for (int attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                var session = client.execute(peerWebSocketHandler, neighbor.getUrl()).get();

                peerWebSocketHandler.registerOutboundSession(neighbor.getId(), session);

                Map<String, String> registerMsg = new HashMap<>();
                registerMsg.put("type", "REGISTER");
                registerMsg.put("nodeId", nodeProperties.getId());
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(registerMsg)));

                System.out.println("Connected to " + neighbor.getId() + " on attempt " + attempt);
                return;

            } catch (Exception e) {
                System.out.println("Attempt " + attempt + " failed for " +
                        neighbor.getId() + ": " + e.getMessage());

                if (attempt < maxAttempts) {
                    try {
                        Thread.sleep(delayMs);
                        delayMs = Math.min(delayMs * 2, 30_000);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        return;
                    }
                }
            }
        }

        System.err.println("FATAL: Could not connect to " +
                neighbor.getId() + " after " + maxAttempts + " attempts");
    }
}
