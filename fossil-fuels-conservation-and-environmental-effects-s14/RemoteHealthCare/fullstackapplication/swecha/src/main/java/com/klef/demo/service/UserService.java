package com.klef.demo.service;

import com.klef.demo.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User verifyUserLogin(String email, String password);
    String registerUser(User user);
    User findUserById(Long id);
    User findUserByEmail(String email);
    List<User> viewAllUsers();
    String updateUser(User updatedUser);
    String deleteUser(Long id);
    long countUsersByRole(String role);
    long countUsersByStatus(String status);
}
