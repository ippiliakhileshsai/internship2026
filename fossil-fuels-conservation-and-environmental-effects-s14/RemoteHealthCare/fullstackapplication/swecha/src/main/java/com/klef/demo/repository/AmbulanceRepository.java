package com.klef.demo.repository;

import com.klef.demo.entity.Ambulance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import jakarta.transaction.Transactional;

@Repository
public interface AmbulanceRepository extends JpaRepository<Ambulance, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE Ambulance a SET a.status = ?2 WHERE a.id = ?1")
    int updateAmbulanceStatus(Long id, String status);
}
