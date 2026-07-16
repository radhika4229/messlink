package com.messlink.node_service.entity;

import com.messlink.node_service.enums.MessageStatus;
import com.messlink.node_service.enums.Priority;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class MeshMessage {

    @Id
    private String messageId;

    private String senderId;
    private String receiverId;
    private String originNode;

    @Column(length = 1000)
    private String payload;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> hopPath = new ArrayList<>();

    private Instant timestamp;

    @Column(length = 500)
    private String signature;


    private String pendingNeighbor;


}
