package com.messlink.node_service.controller;

import com.messlink.node_service.config.NodeProperties;
import com.messlink.node_service.connection.ConnectionManager;
import com.messlink.node_service.router.MessageRouter;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/node")
public class NodeController {

    private final NodeProperties nodeProperties;
    private final ConnectionManager connectionManager;
    private final MessageRouter messageRouter;

    public NodeController(NodeProperties nodeProperties, ConnectionManager connectionManager, MessageRouter messageRouter) {
        this.nodeProperties = nodeProperties;
        this.connectionManager = connectionManager;
        this.messageRouter = messageRouter;
    }

    public record ToggleRequest(String neighborId, boolean connected) {}

    @PostMapping("/toggle-connection")
    public Map<String, Object> toggle(@RequestBody ToggleRequest request) {
        connectionManager.setLogicalConnection(request.neighborId(), request.connected());
        if (request.connected()) {
            messageRouter.flushQueueFor(request.neighborId());
        }
        Map<String, Object> response = new HashMap<>();
        response.put("neighborId", request.neighborId());
        response.put("connected", request.connected());
        return response;
    }

    @GetMapping("/status")
    public Map<String, Object> status() {
        Map<String, Object> response = new HashMap<>();
        response.put("nodeId", nodeProperties.getId());
        Map<String, Boolean> neighborStatus = new HashMap<>();
        for (NodeProperties.Neighbor n : nodeProperties.getNeighbors()) {
            neighborStatus.put(n.getId(), connectionManager.isConnected(n.getId()));
        }
        response.put("neighbors", neighborStatus);
        return response;
    }
}