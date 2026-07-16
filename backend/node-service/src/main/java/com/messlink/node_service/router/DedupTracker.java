package com.messlink.node_service.router;

import org.springframework.stereotype.Component;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class DedupTracker {

    private final Set<String> seenMessageIds = ConcurrentHashMap.newKeySet();
 public boolean isDuplicate(String messageId) {
               return !seenMessageIds.add(messageId);
    }
}