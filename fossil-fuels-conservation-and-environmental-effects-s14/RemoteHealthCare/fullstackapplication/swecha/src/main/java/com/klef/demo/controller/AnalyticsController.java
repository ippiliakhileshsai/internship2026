package com.klef.demo.controller;

import com.klef.demo.entity.TreatmentProgress;
import com.klef.demo.repository.TreatmentProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @Autowired
    private TreatmentProgressRepository treatmentProgressRepository;

    @GetMapping("/patient/{id}")
    public ResponseEntity<TreatmentProgress> getPatientAnalytics(@PathVariable Long id) {
        TreatmentProgress progress = treatmentProgressRepository.findByPatientId(id);
        if (progress != null) {
            return ResponseEntity.ok(progress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardAnalytics() {
        Map<String, Object> dashboardData = new HashMap<>();

        // patientActivityData
        dashboardData.put("patientActivityData", List.of(
            Map.of("time", "08:00", "admissions", 15, "discharges", 5),
            Map.of("time", "12:00", "admissions", 45, "discharges", 25),
            Map.of("time", "16:00", "admissions", 30, "discharges", 40),
            Map.of("time", "20:00", "admissions", 20, "discharges", 15),
            Map.of("time", "24:00", "admissions", 5, "discharges", 2)
        ));

        // emergencyCasesData
        dashboardData.put("emergencyCasesData", List.of(
            Map.of("name", "Trauma", "critical", 12, "stable", 25),
            Map.of("name", "Cardiac", "critical", 18, "stable", 15),
            Map.of("name", "Respiratory", "critical", 8, "stable", 30),
            Map.of("name", "Neurological", "critical", 15, "stable", 10)
        ));

        // recoveryData
        dashboardData.put("recoveryData", List.of(
            Map.of("month", "Jan", "score", 60, "recovery", 30),
            Map.of("month", "Feb", "score", 65, "recovery", 40),
            Map.of("month", "Mar", "score", 75, "recovery", 60),
            Map.of("month", "Apr", "score", 85, "recovery", 80),
            Map.of("month", "May", "score", 90, "recovery", 95)
        ));

        // diseaseDistribution
        dashboardData.put("diseaseDistribution", List.of(
            Map.of("name", "Diabetes", "value", 400),
            Map.of("name", "Heart Disease", "value", 300),
            Map.of("name", "Hypertension", "value", 300),
            Map.of("name", "Asthma", "value", 200)
        ));

        // treatmentStatus
        dashboardData.put("treatmentStatus", List.of(
            Map.of("name", "Completed", "count", 12),
            Map.of("name", "Ongoing", "count", 5),
            Map.of("name", "Pending", "count", 3)
        ));

        // weeklyFlowChartData
        dashboardData.put("weeklyFlowChartData", List.of(
            Map.of("name", "Mon", "Incoming", 18, "Outgoing", 12),
            Map.of("name", "Tue", "Incoming", 24, "Outgoing", 15),
            Map.of("name", "Wed", "Incoming", 32, "Outgoing", 20),
            Map.of("name", "Thu", "Incoming", 28, "Outgoing", 22),
            Map.of("name", "Fri", "Incoming", 41, "Outgoing", 35),
            Map.of("name", "Sat", "Incoming", 15, "Outgoing", 28),
            Map.of("name", "Sun", "Incoming", 22, "Outgoing", 19)
        ));

        return ResponseEntity.ok(dashboardData);
    }
}
