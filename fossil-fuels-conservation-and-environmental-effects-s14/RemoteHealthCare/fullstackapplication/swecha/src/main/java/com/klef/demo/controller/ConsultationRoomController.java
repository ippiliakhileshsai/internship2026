package com.klef.demo.controller;

import com.klef.demo.entity.ConsultationRoom;
import com.klef.demo.repository.ConsultationRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin("*")
public class ConsultationRoomController {

    @Autowired
    private ConsultationRoomRepository roomRepository;

    @GetMapping("/{roomId}")
    public ResponseEntity<ConsultationRoom> getRoomDetails(@PathVariable Long roomId) {
        return roomRepository.findById(roomId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/consultation/{consultationId}")
    public ResponseEntity<ConsultationRoom> getRoomByConsultation(@PathVariable Long consultationId) {
        return roomRepository.findByConsultationId(consultationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
