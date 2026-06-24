package com.klef.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "consultation_recordings")
public class ConsultationRecording {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recordingId;

    @ManyToOne
    @JoinColumn(name = "consultation_id")
    private Consultation consultation;

    private String recordingUrl;
    private LocalDateTime recordingStart;
    private LocalDateTime recordingEnd;

    public ConsultationRecording() {}

    public Long getRecordingId() {
        return recordingId;
    }

    public void setRecordingId(Long recordingId) {
        this.recordingId = recordingId;
    }

    public Consultation getConsultation() {
        return consultation;
    }

    public void setConsultation(Consultation consultation) {
        this.consultation = consultation;
    }

    public String getRecordingUrl() {
        return recordingUrl;
    }

    public void setRecordingUrl(String recordingUrl) {
        this.recordingUrl = recordingUrl;
    }

    public LocalDateTime getRecordingStart() {
        return recordingStart;
    }

    public void setRecordingStart(LocalDateTime recordingStart) {
        this.recordingStart = recordingStart;
    }

    public LocalDateTime getRecordingEnd() {
        return recordingEnd;
    }

    public void setRecordingEnd(LocalDateTime recordingEnd) {
        this.recordingEnd = recordingEnd;
    }
}
