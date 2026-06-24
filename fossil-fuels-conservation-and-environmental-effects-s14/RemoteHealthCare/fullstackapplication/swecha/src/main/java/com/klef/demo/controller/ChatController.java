package com.klef.demo.controller;

import com.klef.demo.entity.ConsultationMessage;
import com.klef.demo.repository.ConsultationMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.time.LocalDateTime;

@Controller
@CrossOrigin("*")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    private ConsultationMessageRepository messageRepository;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ConsultationMessage chatMessage) {
        chatMessage.setTimestamp(LocalDateTime.now());
        chatMessage.setReadStatus(false);
        ConsultationMessage saved = messageRepository.save(chatMessage);
        
        messagingTemplate.convertAndSend("/topic/consultation/" + chatMessage.getConsultation().getId(), saved);
    }
    
    @MessageMapping("/webrtc.signal")
    public void processWebRTCSignal(@Payload String signalPayload) {
        // Broadcast the WebRTC signal to all participants in the room
        messagingTemplate.convertAndSend("/topic/webrtc", signalPayload);
    }
}
