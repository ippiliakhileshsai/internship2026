package com.klef.demo.repository;

import com.klef.demo.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    Patient findByEmailAndPassword(String email, String password);

    List<Patient> findByGender(String gender);

    List<Patient> findByUsernameContaining(String keyword);

    @Query("SELECT p FROM Patient p WHERE p.username LIKE %?1%")
    List<Patient> searchPatientByUsername(String keyword);

    long countByGender(String gender);
    
    @Query("SELECT COUNT(p) FROM Patient p WHERE p.age >= ?1")
    long countByAgeGreaterThanEqual(Integer age);

    boolean existsByContact(String contact);

    @Modifying
    @Transactional
    @Query("UPDATE Patient p SET p.username = ?2, p.age = ?3, p.gender = ?4, p.contact = ?5, p.healthScore = ?6, p.recoveryPercentage = ?7, p.previousMedicalConditions = ?8 WHERE p.id = ?1")
    int updatePatientById(Long id, String username, Integer age, String gender, String contact, Integer healthScore, Double recoveryPercentage, String previousMedicalConditions);

    @Modifying
    @Transactional
    @Query("UPDATE Patient p SET p.healthScore = ?2, p.recoveryPercentage = ?3 WHERE p.id = ?1")
    int updatePatientHealthStats(Long id, Integer healthScore, Double recoveryPercentage);

    @Modifying
    @Transactional
    @Query("DELETE FROM Patient p WHERE p.id = ?1")
    int deletePatientById(Long id);
}

