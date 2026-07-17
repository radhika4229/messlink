package com.messlink.node_service.websocket;

import com.messlink.node_service.connection.ConnectionManager;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class ClientWebSocketHandler extends TextWebSocketHandler {

    private final ConnectionManager connectionManager;

    public ClientWebSocketHandler(ConnectionManager connectionManager) {
        this.connectionManager = connectionManager;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // ✅ FIX 2: path se nodeId parse karo — "/ws/client/NODE_A" → "NODE_A"
        String path = session.getUri().getPath();
        String nodeId = path.substring(path.lastIndexOf('/') + 1);
        connectionManager.registerClientSession(nodeId, session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // ✅ FIX 2: nodeId se remove karo
        String path = session.getUri().getPath();
        String nodeId = path.substring(path.lastIndexOf('/') + 1);
        connectionManager.removeClientSession(nodeId);
    }
}
