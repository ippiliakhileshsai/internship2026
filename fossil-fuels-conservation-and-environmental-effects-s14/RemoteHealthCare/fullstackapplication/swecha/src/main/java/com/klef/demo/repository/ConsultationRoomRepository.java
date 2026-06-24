package com.klef.demo.repository;

import com.klef.demo.entity.ConsultationRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConsultationRoomRepository extends JpaRepository<ConsultationRoom, Long> {
    Optional<ConsultationRoom> findByConsultationId(Long consultationId);
}
