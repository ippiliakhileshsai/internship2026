package com.klef.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.demo.entity.Doctor;
import com.klef.demo.entity.Consultation;
import com.klef.demo.entity.Prescription;
import com.klef.demo.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public String doctorRegistration(Doctor doctor) {
        try {
            doctorRepository.save(doctor);
            return "Doctor Registered Successfully";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public Doctor verifyDoctorLogin(String email, String password) {
        return doctorRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Doctor> viewAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public String updateDoctorProfile(Doctor doctor) {
        Optional<Doctor> optional = doctorRepository.findById(doctor.getId());
        if(optional.isPresent()) {
            Doctor d = optional.get();
            d.setUsername(doctor.getUsername());
            d.setPassword(doctor.getPassword());
            d.setEmail(doctor.getEmail());
            d.setFirstName(doctor.getFirstName());
            d.setLastName(doctor.getLastName());
            d.setContact(doctor.getContact());
            d.setGender(doctor.getGender());
            d.setLocation(doctor.getLocation());
            d.setQualification(doctor.getQualification());
            d.setExperienceYears(doctor.getExperienceYears());
            d.setRating(doctor.getRating());
            d.setHospitalName(doctor.getHospitalName());
            d.setAvailability(doctor.getAvailability());
            d.setConsultationFee(doctor.getConsultationFee());
            d.setSpecialization(doctor.getSpecialization());
            
            doctorRepository.save(d);
            return "Doctor Profile Updated Successfully";
        } else {
            return "Doctor ID Not Found to Update";
        }
    }

    @Override
    public String deleteDoctor(Long id) {
        try {
            doctorRepository.deleteById(id);
            return "Doctor Deleted Successfully";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public List<Consultation> viewDoctorConsultations(Long doctorId) {
        // Implementation logic for consultation
        return null;
    }

    @Override
    public Consultation updateConsultationStatus(Long consultationId, String status) {
        // Implementation logic for consultation status update
        return null;
    }

    @Override
    public Prescription generatePrescription(Prescription prescription) {
        // Implementation logic for prescription generation
        return null;
    }
}
