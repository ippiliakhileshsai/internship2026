package com.klef.demo.repository;

import com.klef.demo.entity.EmergencyRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

@Repository
public interface EmergencyRequestRepository extends JpaRepository<EmergencyRequest, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE EmergencyRequest e SET e.status = ?2 WHERE e.id = ?1")
    int updateEmergencyStatus(Long id, String status);
}
