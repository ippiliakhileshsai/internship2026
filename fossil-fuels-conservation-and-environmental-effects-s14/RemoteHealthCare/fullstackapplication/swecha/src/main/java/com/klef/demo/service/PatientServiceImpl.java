package com.klef.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.demo.entity.Patient;
import com.klef.demo.entity.Consultation;
import com.klef.demo.entity.MedicalRecord;
import com.klef.demo.entity.Prescription;
import com.klef.demo.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public String patientRegistration(Patient patient) {
        try {
            patientRepository.save(patient);
            return "Patient Registered Successfully";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public Patient verifyPatientLogin(String email, String password) {
        return patientRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @Override
    public List<Patient> viewAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public String updatePatientProfile(Patient patient) {
        Optional<Patient> optional = patientRepository.findById(patient.getId());
        if(optional.isPresent()) {
            Patient p = optional.get();
            p.setUsername(patient.getUsername());
            p.setPassword(patient.getPassword());
            p.setEmail(patient.getEmail());
            p.setFirstName(patient.getFirstName());
            p.setLastName(patient.getLastName());
            p.setContact(patient.getContact());
            p.setGender(patient.getGender());
            p.setLocation(patient.getLocation());
            patientRepository.save(p);
            return "Patient Profile Updated Successfully";
        } else {
            return "Patient ID Not Found to Update";
        }
    }

    @Override
    public String deletePatient(Long id) {
        try {
            patientRepository.deleteById(id);
            return "Patient Deleted Successfully";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public Consultation requestConsultation(Consultation consultation) {
        // Implementation logic for consultation
        return null;
    }

    @Override
    public List<Consultation> viewPatientConsultations(Long patientId) {
        // Implementation logic for consultation
        return null;
    }

    @Override
    public List<MedicalRecord> viewPatientMedicalRecords(String patientId) {
        // Implementation logic for medical records
        return null;
    }

    @Override
    public List<Prescription> viewPatientPrescriptions(Long patientId) {
        // Implementation logic for prescriptions
        return null;
    }
}
