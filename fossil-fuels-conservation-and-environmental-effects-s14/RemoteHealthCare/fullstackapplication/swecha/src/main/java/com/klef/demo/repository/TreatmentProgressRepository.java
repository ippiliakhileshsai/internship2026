package com.klef.demo.repository;

import com.klef.demo.entity.TreatmentProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreatmentProgressRepository extends JpaRepository<TreatmentProgress, Long> {
    TreatmentProgress findByPatientId(Long patientId);
}
