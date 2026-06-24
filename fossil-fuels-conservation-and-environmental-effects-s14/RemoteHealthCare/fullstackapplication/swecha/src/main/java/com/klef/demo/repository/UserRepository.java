package com.klef.demo.repository;

import com.klef.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmailAndPassword(String email, String password);

    @Query("SELECT u FROM User u WHERE u.email = ?1 AND u.password = ?2")
    User checkLogin(String email, String password);

    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndRole(String email, String role);
    List<User> findByRole(String role);
    List<User> findByStatus(String status);

    List<User> findByUsernameContaining(String keyword);

    long countByRole(String role);
    long countByStatus(String status);

    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.username = ?2, u.role = ?3, u.email = ?4, u.status = ?5, u.password = ?6 WHERE u.id = ?1")
    int updateUserById(Long id, String username, String role, String email, String status, String password);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.password = ?2 WHERE u.email = ?1")
    int updatePasswordByEmail(String email, String password);

    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.status = ?2 WHERE u.id = ?1")
    int updateStatusById(Long id, String status);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.id = ?1")
    int deleteUserById(Long id);
}

