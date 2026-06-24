package com.klef.demo.controller;

import com.klef.demo.entity.FlowEvent;
import com.klef.demo.repository.FlowEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/flow-events")
@CrossOrigin("*")
public class FlowEventController {

    @Autowired
    private FlowEventRepository flowEventRepository;

    @GetMapping
    public ResponseEntity<List<FlowEvent>> getAllFlowEvents() {
        List<FlowEvent> events = flowEventRepository.findAll();
        // Return sorted by date/id descending to show latest first
        events.sort((a, b) -> b.getId().compareTo(a.getId()));
        return ResponseEntity.ok(events);
    }

    @PostMapping
    public ResponseEntity<?> createFlowEvent(@RequestBody FlowEvent newEvent) {
        if (newEvent.getName() == null || newEvent.getType() == null || newEvent.getRoom() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"success\": false, \"message\": \"Name, type, and room are required.\"}");
        }

        // Generate ID like flow-1781949116454
        newEvent.setId("flow-" + System.currentTimeMillis());

        // Format Date (yyyy-MM-dd)
        newEvent.setDate(LocalDate.now().toString());

        // Format Time (hh:mm a, e.g. 10:24 AM)
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
        newEvent.setTime(LocalTime.now().format(timeFormatter));

        // Generate Billing Code like TX-4482
        Random random = new Random();
        int randomCode = 1000 + random.nextInt(9000);
        newEvent.setBillingCode("TX-" + randomCode);

        if (newEvent.getAmount() == null) {
            newEvent.setAmount(0.0);
        }

        FlowEvent saved = flowEventRepository.save(newEvent);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
