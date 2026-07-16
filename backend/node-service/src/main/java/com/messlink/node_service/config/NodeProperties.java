package com.messlink.node_service.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Data
@Component
@ConfigurationProperties(prefix = "node")
public class NodeProperties {

    private String id;
    private List<Neighbor> neighbors = new ArrayList<>();
    @Data
    public static class Neighbor {
        private String id;
        private String url;
    }
    public boolean isDirectNeighbor(String nodeId) {
        if (nodeId == null || neighbors == null) return false;
        return neighbors.stream()
                .anyMatch(n -> nodeId.equals(n.getId()));
    }

}
