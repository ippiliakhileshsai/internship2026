package com.klef.demo.repository;

import com.klef.demo.entity.ConsultationParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationParticipantRepository extends JpaRepository<ConsultationParticipant, Long> {
    List<ConsultationParticipant> findByRoomRoomId(Long roomId);
}
