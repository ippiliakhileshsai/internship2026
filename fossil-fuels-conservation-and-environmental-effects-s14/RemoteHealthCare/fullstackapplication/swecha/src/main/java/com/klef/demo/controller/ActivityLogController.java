package com.klef.demo.controller;

import com.klef.demo.entity.ActivityLog;
import com.klef.demo.repository.ActivityLogRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@CrossOrigin("*")
public class ActivityLogController {

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @PostConstruct
    public void init() {
        if (activityLogRepository.count() == 0) {
            activityLogRepository.save(createLog("act-1", "Dr. Sarah Connor", "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150", "Cardiologist", "Uploaded ECG Scan for Patient John Doe", "Scan", "Just now", "completed"));
            activityLogRepository.save(createLog("act-2", "Ambulance Unit 4", "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=150", "Emergency Team", "Dispatched response for Cardiac Arrest Alert", "Emergency", "4 mins ago", "active"));
            activityLogRepository.save(createLog("act-3", "Dr. Michael Chen", "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150", "General Physician", "Prescribed Amoxicillin 500mg to Alice Smith", "Prescription", "15 mins ago", "completed"));
            activityLogRepository.save(createLog("act-4", "Lab Tech Jessica Taylor", "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=150", "Lab Technician", "Uploaded Complete Blood Count (CBC) report", "Report", "1 hour ago", "completed"));
            activityLogRepository.save(createLog("act-5", "Patient Robert Downey", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150", "Patient", "Requested Video Consultation with Dr. Connor", "Booking", "2 hours ago", "pending"));
        }
    }

    private ActivityLog createLog(String id, String user, String avatar, String role, String action, String category, String date, String status) {
        ActivityLog log = new ActivityLog();
        log.setId(id);
        log.setUser(user);
        log.setAvatar(avatar);
        log.setRole(role);
        log.setAction(action);
        log.setCategory(category);
        log.setDate(date);
        log.setStatus(status);
        return log;
    }

    @GetMapping
    public ResponseEntity<List<ActivityLog>> getAllActivities() {
        List<ActivityLog> activities = activityLogRepository.findAll();
        // Return descending (latest first) based on ID assuming sequential
        activities.sort((a, b) -> b.getId().compareTo(a.getId()));
        return ResponseEntity.ok(activities);
    }

    @PostMapping
    public ResponseEntity<ActivityLog> createActivity(@RequestBody ActivityLog log) {
        if (log.getId() == null || log.getId().isEmpty()) {
            log.setId("act-" + System.currentTimeMillis());
        }
        ActivityLog saved = activityLogRepository.save(log);
        return ResponseEntity.ok(saved);
    }
}
