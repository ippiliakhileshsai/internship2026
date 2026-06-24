package com.klef.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.demo.entity.User;
import com.klef.demo.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User verifyUserLogin(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public String registerUser(User user) {
        try {
            userRepository.save(user);
            return "User Registered Successfully";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Override
    public List<User> viewAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public String updateUser(User updatedUser) {
        Optional<User> optional = userRepository.findById(updatedUser.getId());
        if(optional.isPresent()) {
            User u = optional.get();
            u.setUsername(updatedUser.getUsername());
            u.setRole(updatedUser.getRole());
            u.setEmail(updatedUser.getEmail());
            u.setStatus(updatedUser.getStatus());
            u.setPassword(updatedUser.getPassword());
            userRepository.save(u);
            return "User Profile Updated Successfully";
        } else {
            return "User ID Not Found to Update";
        }
    }

    @Override
    public String deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return "User Deleted Successfully";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @Override
    public long countUsersByRole(String role) {
        return userRepository.countByRole(role);
    }

    @Override
    public long countUsersByStatus(String status) {
        return userRepository.countByStatus(status);
    }
}
