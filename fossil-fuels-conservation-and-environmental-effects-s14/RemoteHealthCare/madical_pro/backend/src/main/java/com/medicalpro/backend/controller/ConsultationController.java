package com.medicalpro.backend.controller;

import com.medicalpro.backend.entity.Consultation;
import com.medicalpro.backend.repository.ConsultationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    @Autowired
    private ConsultationRepository consultationRepository;

    @PostMapping("/book")
    public ResponseEntity<Consultation> bookConsultation(@RequestBody Consultation consultation) {
        consultation.setBookingTimestamp(LocalDateTime.now());
        consultation.setStatus("Pending");
        Consultation saved = consultationRepository.save(consultation);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/patient/{id}")
    public ResponseEntity<List<Consultation>> getPatientConsultations(@PathVariable Long id) {
        return ResponseEntity.ok(consultationRepository.findByPatientId(id));
    }

    @GetMapping("/doctor/{id}")
    public ResponseEntity<List<Consultation>> getDoctorConsultations(@PathVariable Long id) {
        return ResponseEntity.ok(consultationRepository.findByDoctorId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultation(@PathVariable Long id) {
        return consultationRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<Consultation> updateStatus(@PathVariable Long id, @RequestBody String status) {
        return consultationRepository.findById(id).map(c -> {
            c.setStatus(status);
            return ResponseEntity.ok(consultationRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }
}
