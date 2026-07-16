package com.messlink.node_service.router;

import com.messlink.node_service.entity.MeshMessage;

import com.messlink.node_service.enums.MessageStatus;
import com.messlink.node_service.repository.MessageRepository;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;

@Component
public class StoreForwardQueue {

    private final MessageRepository messageRepository;

    public StoreForwardQueue(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void enqueue(MeshMessage message, String neighborId) {
        message.setStatus(MessageStatus.QUEUED);
        message.setPendingNeighbor(neighborId);
        messageRepository.save(message);
    }

     public List<MeshMessage> getPendingFor(String neighborId) {
        List<MeshMessage> pending = messageRepository.findByStatusAndPendingNeighbor(MessageStatus.QUEUED, neighborId);
        pending.sort(Comparator.comparing((MeshMessage m) -> m.getPriority().name()).reversed()
                .thenComparing(MeshMessage::getTimestamp));
        return pending;
    }
}
