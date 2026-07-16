
package com.messlink.node_service.config;

import com.messlink.node_service.websocket.ClientWebSocketHandler;
import com.messlink.node_service.websocket.PeerWebSocketHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    private final PeerWebSocketHandler peerWebSocketHandler;
    private final ClientWebSocketHandler clientWebSocketHandler;

    public WebSocketConfig(PeerWebSocketHandler peerWebSocketHandler, ClientWebSocketHandler clientWebSocketHandler) {
        this.peerWebSocketHandler = peerWebSocketHandler;
        this.clientWebSocketHandler = clientWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(peerWebSocketHandler, "/ws/peer").setAllowedOrigins("*");
        registry.addHandler(clientWebSocketHandler, "/ws/client").setAllowedOrigins("*");
    }
}