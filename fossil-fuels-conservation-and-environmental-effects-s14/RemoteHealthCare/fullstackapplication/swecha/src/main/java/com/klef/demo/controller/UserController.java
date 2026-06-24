package com.klef.demo.controller;

import com.klef.demo.entity.User;
import com.klef.demo.repository.UserRepository;
import com.klef.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private com.klef.demo.repository.DoctorRepository doctorRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // Return users sorted by id descending to show newest first, matching mock behavior
        List<User> users = userRepository.findAll();
        users.sort((a, b) -> b.getId().compareTo(a.getId()));
        return ResponseEntity.ok(users);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User newUser) {
        if (newUser.getUsername() == null || newUser.getRole() == null || newUser.getEmail() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name, role, and email are required.");
        }

        // Check if email already exists
        Optional<User> existingOpt = userRepository.findByEmail(newUser.getEmail());
        if (existingOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("A user with this email already exists.");
        }

        // Generate a random temporary passcode (e.g. care-XXXX)
        Random random = new Random();
        int code = 1000 + random.nextInt(9000);
        String generatedPassword = "care-" + code;

        newUser.setPassword(generatedPassword);
        if (newUser.getStatus() == null) {
            newUser.setStatus("Active");
        }

        User savedUser = userRepository.save(newUser);

        // Also create a record in Doctor table if role is Doctor
        if ("Doctor".equalsIgnoreCase(savedUser.getRole())) {
            com.klef.demo.entity.Doctor doc = new com.klef.demo.entity.Doctor();
            doc.setUsername(savedUser.getUsername());
            
            // Split name into first and last name simply
            String[] names = savedUser.getUsername().split(" ", 2);
            doc.setFirstName(names[0]);
            doc.setLastName(names.length > 1 ? names[1] : "");
            
            doc.setEmail(savedUser.getEmail());
            doc.setPassword(savedUser.getPassword());
            doc.setSpecialization("General"); // Default specialization
            doc.setContact("Pending-" + savedUser.getId()); // Required unique field
            doc.setGender("Not Specified"); // Required field
            doc.setLocation("Main Hospital"); // Required field
            
            try {
                doctorRepository.save(doc);
            } catch (Exception e) {
                System.err.println("Failed to save Doctor entity: " + e.getMessage());
            }
        }

        // Send credentials email in the background or safely catch exceptions
        try {
            emailService.sendCredentialsEmail(savedUser.getEmail(), savedUser.getUsername(), savedUser.getRole(), generatedPassword);
        } catch (Exception e) {
            System.err.println("Failed to send credentials email to: " + savedUser.getEmail() + " | Error: " + e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    String name = updatedUser.getUsername() != null ? updatedUser.getUsername() : user.getUsername();
                    String role = updatedUser.getRole() != null ? updatedUser.getRole() : user.getRole();
                    String email = updatedUser.getEmail() != null ? updatedUser.getEmail() : user.getEmail();
                    String status = updatedUser.getStatus() != null ? updatedUser.getStatus() : user.getStatus();
                    String password = updatedUser.getPassword() != null ? updatedUser.getPassword() : user.getPassword();
                    
                    int updatedRows = userRepository.updateUserById(id, name, role, email, status, password);
                    if (updatedRows > 0) {
                        return userRepository.findById(id)
                                .map(ResponseEntity::ok)
                                .orElse(ResponseEntity.notFound().build());
                    } else {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update user.");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (userRepository.existsById(id)) {
            int deletedRows = userRepository.deleteUserById(id);
            if (deletedRows > 0) {
                return ResponseEntity.ok().body("{\"success\": true, \"message\": \"User removed successfully.\"}");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
