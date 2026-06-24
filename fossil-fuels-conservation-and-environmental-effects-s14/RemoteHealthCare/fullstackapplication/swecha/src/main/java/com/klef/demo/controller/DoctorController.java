package com.klef.demo.controller;

import com.klef.demo.entity.Doctor;
import com.klef.demo.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController {

    @Autowired
    private DoctorRepository doctorRepository;

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorRepository.findAll());
    }

    @GetMapping("/specialization/{name}")
    public ResponseEntity<List<Doctor>> getDoctorsBySpecialization(@PathVariable String name) {
        return ResponseEntity.ok(doctorRepository.findBySpecializationIgnoreCaseContaining(name));
    }
}
