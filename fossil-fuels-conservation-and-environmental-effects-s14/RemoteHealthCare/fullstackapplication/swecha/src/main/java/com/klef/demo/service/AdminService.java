package com.klef.demo.service;

import java.util.List;
import com.klef.demo.entity.User;
import com.klef.demo.entity.Patient;
import com.klef.demo.entity.Doctor;

public interface AdminService {
    User verifyAdminLogin(String email, String password);
    
    // Patient Management
    List<Patient> viewAllPatients();
    String deletePatient(Long id);
    long countPatients();

    // Doctor Management
    List<Doctor> viewAllDoctors();
    String deleteDoctor(Long id);
    long countDoctors();

    // User/System Management
    List<User> viewAllUsers(); 
    String deleteUser(Long id);
    long countTotalUsers();
}
