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
        connectionManager.registerClientSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        connectionManager.removeClientSession(session);
    }
}
