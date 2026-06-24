package com.klef.demo.controller;

import com.klef.demo.entity.User;
import com.klef.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/passwords")
    public ResponseEntity<Map<String, String>> getPasswords() {
        Map<String, String> passwords = new HashMap<>();
        List<String> roles = Arrays.asList("Patient", "Manager", "Accountant", "Admin", "Doctor");
        
        for (String role : roles) {
            List<User> roleUsers = userRepository.findAll().stream()
                    .filter(u -> u.getRole().equalsIgnoreCase(role))
                    .toList();
            if (!roleUsers.isEmpty()) {
                passwords.put(role, roleUsers.get(0).getPassword());
            } else {
                passwords.put(role, "••••••••");
            }
        }
        return ResponseEntity.ok(passwords);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String role = credentials.get("role");

        if (role == null || email == null || password == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Email, password, and role are required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Search for user by email or username and role (case-insensitive for convenience)
        Optional<User> userOpt = userRepository.findAll().stream()
                .filter(u -> (u.getEmail().equalsIgnoreCase(email.trim()) || 
                             (u.getUsername() != null && u.getUsername().equalsIgnoreCase(email.trim()))) && 
                             u.getRole().equalsIgnoreCase(role.trim()))
                .findFirst();

        if (userOpt.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "No account found for " + email + " with role " + role + ".");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        User user = userOpt.get();
        String expectedPassword = user.getPassword().trim().toLowerCase();
        String providedPassword = password.trim().toLowerCase();

        if (providedPassword.equals(expectedPassword)) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("role", user.getRole());
            response.put("token", "mock-jwt-token-for-" + user.getRole().toLowerCase());
            response.put("user", user); // Provide user details to frontend
            return ResponseEntity.ok(response);
        } else {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid credentials. Please enter the correct passcode for the " + role + " portal.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> payload) {
        String role = payload.get("role");
        String newPassword = payload.get("newPassword");

        if (role == null || newPassword == null) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Role and newPassword are required.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        // Find all users with this role and reset their passwords
        List<User> usersToUpdate = userRepository.findAll().stream()
                .filter(u -> u.getRole().equalsIgnoreCase(role.trim()))
                .toList();

        if (usersToUpdate.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "No users found with role: " + role);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        for (User u : usersToUpdate) {
            u.setPassword(newPassword);
            userRepository.save(u);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Password for " + role + " reset successfully!");
        return ResponseEntity.ok(response);
    }
}
