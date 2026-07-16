package com.messlink.node_service.controller;
import com.messlink.node_service.config.NodeProperties;
import com.messlink.node_service.entity.MeshMessage;
import com.messlink.node_service.enums.MessageStatus;
import com.messlink.node_service.repository.MessageRepository;
import com.messlink.node_service.router.MessageRouter;
import com.messlink.node_service.security.SignatureService;
import org.springframework.web.bind.annotation.*;
import com.messlink.node_service.enums.Priority;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    private final MessageRouter messageRouter;
    private final SignatureService signatureService;
    private final MessageRepository messageRepository;
    private final NodeProperties nodeProperties;

    public MessageController(MessageRouter messageRouter, SignatureService signatureService,
                             MessageRepository messageRepository, NodeProperties nodeProperties) {
        this.messageRouter = messageRouter;
        this.signatureService = signatureService;
        this.messageRepository = messageRepository;
        this.nodeProperties = nodeProperties;
    }

    public record SendMessageRequest(String senderId, String receiverId, String payload, Priority priority) {}

    @PostMapping("/send")
    public MeshMessage send(@RequestBody SendMessageRequest request) {
        MeshMessage message = new MeshMessage();
        message.setMessageId(UUID.randomUUID().toString());
        message.setSenderId(request.senderId());
        message.setReceiverId(request.receiverId());
        message.setOriginNode(nodeProperties.getId());
        message.setPayload(request.payload());
        message.setPriority(request.priority());
        message.setStatus(MessageStatus.IN_TRANSIT);
        message.setHopPath(new ArrayList<>(List.of(nodeProperties.getId())));
        message.setTimestamp(Instant.now());
        message.setSignature(signatureService.sign(message));

        messageRouter.route(message);
        return message;
    }

    @GetMapping("/log/{nodeId}")
    public List<MeshMessage> log(@PathVariable String nodeId) {
        return messageRepository.findAll();
    }
}
