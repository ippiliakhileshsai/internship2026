package com.klef.demo.controller;

import com.klef.demo.entity.Ambulance;
import com.klef.demo.repository.AmbulanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ambulances")
@CrossOrigin("*")
public class AmbulanceController {

    @Autowired
    private AmbulanceRepository ambulanceRepository;

    @GetMapping
    public ResponseEntity<List<Ambulance>> getAllAmbulances() {
        return ResponseEntity.ok(ambulanceRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Ambulance> createAmbulance(@RequestBody Ambulance newAmbulance) {
        if (newAmbulance.getStatus() == null) {
            newAmbulance.setStatus("Available");
        }
        Ambulance saved = ambulanceRepository.save(newAmbulance);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAmbulanceStatus(@PathVariable Long id, @RequestParam String status) {
        return ambulanceRepository.findById(id)
                .map(ambulance -> {
                    int updatedRows = ambulanceRepository.updateAmbulanceStatus(id, status);
                    if (updatedRows > 0) {
                        return ambulanceRepository.findById(id)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
                    } else {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update ambulance status.");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
