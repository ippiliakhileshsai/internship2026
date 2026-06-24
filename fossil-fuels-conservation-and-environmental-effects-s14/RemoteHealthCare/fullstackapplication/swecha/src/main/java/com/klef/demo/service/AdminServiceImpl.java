package com.klef.demo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.demo.entity.Doctor;
import com.klef.demo.entity.Patient;
import com.klef.demo.entity.User;
import com.klef.demo.repository.DoctorRepository;
import com.klef.demo.repository.PatientRepository;
import com.klef.demo.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public User verifyAdminLogin(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        if(user != null && "Admin".equals(user.getRole())) {
            return user;
        }
        return null;
    }

    @Override
    public List<Patient> viewAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public String deletePatient(Long id) {
        try {
            patientRepository.deleteById(id);
            return "Patient Deleted Successfully";
        } catch(Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public long countPatients() {
        return patientRepository.count();
    }

    @Override
    public List<Doctor> viewAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public String deleteDoctor(Long id) {
        try {
            doctorRepository.deleteById(id);
            return "Doctor Deleted Successfully";
        } catch(Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public long countDoctors() {
        return doctorRepository.count();
    }

    @Override
    public List<User> viewAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public String deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return "User Deleted Successfully";
        } catch(Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public long countTotalUsers() {
        return userRepository.count();
    }
}
