package com.klef.demo.service;

import com.klef.demo.entity.Doctor;
import com.klef.demo.entity.Consultation;
import com.klef.demo.entity.Prescription;
import java.util.List;
import java.util.Optional;

public interface DoctorService {
    String doctorRegistration(Doctor doctor);
    Doctor verifyDoctorLogin(String email, String password);
    Doctor getDoctorById(Long id);
    List<Doctor> viewAllDoctors();
    String updateDoctorProfile(Doctor doctor);
    String deleteDoctor(Long id);
    
    // Appointments & Telehealth
    List<Consultation> viewDoctorConsultations(Long doctorId);
    Consultation updateConsultationStatus(Long consultationId, String status);
    
    // Prescriptions
    Prescription generatePrescription(Prescription prescription);
}
