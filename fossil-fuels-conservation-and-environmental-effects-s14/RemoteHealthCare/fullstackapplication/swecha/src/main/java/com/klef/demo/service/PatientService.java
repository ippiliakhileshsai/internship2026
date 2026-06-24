package com.klef.demo.service;

import com.klef.demo.entity.Patient;
import com.klef.demo.entity.Consultation;
import com.klef.demo.entity.MedicalRecord;
import com.klef.demo.entity.Prescription;
import java.util.List;
import java.util.Optional;

public interface PatientService {
    String patientRegistration(Patient patient);
    Patient verifyPatientLogin(String email, String password);
    Patient getPatientById(Long id);
    List<Patient> viewAllPatients();
    String updatePatientProfile(Patient patient);
    String deletePatient(Long id);
    
    // Consultations (Appointments)
    Consultation requestConsultation(Consultation consultation);
    List<Consultation> viewPatientConsultations(Long patientId);
    
    // Medical Records & Prescriptions
    List<MedicalRecord> viewPatientMedicalRecords(String patientId);
    List<Prescription> viewPatientPrescriptions(Long patientId);
}
