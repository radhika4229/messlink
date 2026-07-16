package com.messlink.node_service.repository;

import com.messlink.node_service.entity.MeshMessage;

import com.messlink.node_service.enums.MessageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<MeshMessage, String> {
    List<MeshMessage> findByStatusAndPendingNeighbor(MessageStatus status, String pendingNeighbor);
}
