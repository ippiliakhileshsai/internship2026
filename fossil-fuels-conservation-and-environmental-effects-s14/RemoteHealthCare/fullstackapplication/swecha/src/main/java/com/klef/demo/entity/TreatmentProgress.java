package com.klef.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "treatment_progress")
public class TreatmentProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;
    
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;
    
    private String treatmentStatus; // Pending, Ongoing, Completed
    private Double recoveryPercentage;
    private Integer healthScore;
    private LocalDateTime nextFollowUpDate;
    private LocalDateTime updatedAt;

    public TreatmentProgress() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getTreatmentStatus() {
        return treatmentStatus;
    }

    public void setTreatmentStatus(String treatmentStatus) {
        this.treatmentStatus = treatmentStatus;
    }

    public Double getRecoveryPercentage() {
        return recoveryPercentage;
    }

    public void setRecoveryPercentage(Double recoveryPercentage) {
        this.recoveryPercentage = recoveryPercentage;
    }

    public Integer getHealthScore() {
        return healthScore;
    }

    public void setHealthScore(Integer healthScore) {
        this.healthScore = healthScore;
    }

    public LocalDateTime getNextFollowUpDate() {
        return nextFollowUpDate;
    }

    public void setNextFollowUpDate(LocalDateTime nextFollowUpDate) {
        this.nextFollowUpDate = nextFollowUpDate;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
