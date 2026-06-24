package com.klef.demo.controller;

import com.klef.demo.entity.EmergencyRequest;
import com.klef.demo.repository.EmergencyRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergencies")
@CrossOrigin("*")
public class EmergencyRequestController {

    @Autowired
    private EmergencyRequestRepository emergencyRequestRepository;

    @GetMapping
    public ResponseEntity<List<EmergencyRequest>> getAllEmergencies() {
        List<EmergencyRequest> emergencies = emergencyRequestRepository.findAll();
        emergencies.sort((a, b) -> b.getId().compareTo(a.getId()));
        return ResponseEntity.ok(emergencies);
    }

    @PostMapping
    public ResponseEntity<EmergencyRequest> createEmergency(@RequestBody EmergencyRequest newEmergency) {
        if (newEmergency.getStatus() == null) {
            newEmergency.setStatus("Pending");
        }
        if (newEmergency.getTimestamp() == null) {
            newEmergency.setTimestamp("Just now");
        }
        EmergencyRequest saved = emergencyRequestRepository.save(newEmergency);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateEmergencyStatus(@PathVariable Long id, @RequestParam String status) {
        return emergencyRequestRepository.findById(id)
                .map(emergency -> {
                    int updatedRows = emergencyRequestRepository.updateEmergencyStatus(id, status);
                    if (updatedRows > 0) {
                        return emergencyRequestRepository.findById(id)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
                    } else {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update emergency status.");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
