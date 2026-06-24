package com.klef.demo.controller;

import com.klef.demo.entity.MedicalRecord;
import com.klef.demo.repository.MedicalRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/records")
@CrossOrigin("*")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @GetMapping
    public ResponseEntity<List<MedicalRecord>> getAllRecords() {
        List<MedicalRecord> records = medicalRecordRepository.findAll();
        // Sort by ID descending to show newest first, matching mock behavior
        records.sort((a, b) -> b.getId().compareTo(a.getId()));
        return ResponseEntity.ok(records);
    }

    @PostMapping
    public ResponseEntity<?> createRecord(@RequestBody MedicalRecord newRecord) {
        if (newRecord.getPatientName() == null || newRecord.getTitle() == null || newRecord.getRecordType() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"success\": false, \"message\": \"patientName, title, and recordType are required.\"}");
        }

        // Generate ID like rec-1781949116454
        if (newRecord.getId() == null || newRecord.getId().isEmpty()) {
            newRecord.setId("rec-" + System.currentTimeMillis());
        }

        if (newRecord.getFileUrl() == null) {
            newRecord.setFileUrl("#");
        }

        MedicalRecord saved = medicalRecordRepository.save(newRecord);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRecord(@PathVariable String id, @RequestBody MedicalRecord updatedRecord) {
        return medicalRecordRepository.findById(id)
                .map(record -> {
                    if (updatedRecord.getPatientName() != null) record.setPatientName(updatedRecord.getPatientName());
                    if (updatedRecord.getPatientAge() != null) record.setPatientAge(updatedRecord.getPatientAge());
                    if (updatedRecord.getPatientGender() != null) record.setPatientGender(updatedRecord.getPatientGender());
                    if (updatedRecord.getPatientId() != null) record.setPatientId(updatedRecord.getPatientId());
                    if (updatedRecord.getRecordType() != null) record.setRecordType(updatedRecord.getRecordType());
                    if (updatedRecord.getTitle() != null) record.setTitle(updatedRecord.getTitle());
                    if (updatedRecord.getDate() != null) record.setDate(updatedRecord.getDate());
                    if (updatedRecord.getShortDescription() != null) record.setShortDescription(updatedRecord.getShortDescription());
                    if (updatedRecord.getDoctorName() != null) record.setDoctorName(updatedRecord.getDoctorName());
                    if (updatedRecord.getDepartment() != null) record.setDepartment(updatedRecord.getDepartment());
                    if (updatedRecord.getDetails() != null) record.setDetails(updatedRecord.getDetails());
                    if (updatedRecord.getFileUrl() != null) record.setFileUrl(updatedRecord.getFileUrl());

                    MedicalRecord saved = medicalRecordRepository.save(record);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecord(@PathVariable String id) {
        if (medicalRecordRepository.existsById(id)) {
            medicalRecordRepository.deleteById(id);
            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Record removed successfully.\"}");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
