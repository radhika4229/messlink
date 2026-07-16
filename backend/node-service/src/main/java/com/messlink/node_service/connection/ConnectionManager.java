package com.messlink.node_service.connection;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ConnectionManager {


    private final ConcurrentHashMap<String, WebSocketSession> peerSessions = new ConcurrentHashMap<>();

     private final ConcurrentHashMap<String, WebSocketSession> clientSessions = new ConcurrentHashMap<>();

    private final Set<String> logicallyDisconnected = ConcurrentHashMap.newKeySet();

    public void registerPeerSession(String neighborId, WebSocketSession session) {
        peerSessions.put(neighborId, session);
    }

    public void removePeerSession(String neighborId) {
        peerSessions.remove(neighborId);
    }

    public WebSocketSession getPeerSession(String neighborId) {
        return peerSessions.get(neighborId);
    }

    public void registerClientSession(WebSocketSession session) {
        clientSessions.put(session.getId(), session);
    }

    public void removeClientSession(WebSocketSession session) {
        clientSessions.remove(session.getId());
    }

    public java.util.Collection<WebSocketSession> getClientSessions() {
        return clientSessions.values();
    }

    public boolean isConnected(String neighborId) {
        WebSocketSession session = peerSessions.get(neighborId);
        return session != null && session.isOpen() && !logicallyDisconnected.contains(neighborId);
    }

    public void setLogicalConnection(String neighborId, boolean connected) {
        if (connected) {
            logicallyDisconnected.remove(neighborId);
        } else {
            logicallyDisconnected.add(neighborId);
        }
    }
}
