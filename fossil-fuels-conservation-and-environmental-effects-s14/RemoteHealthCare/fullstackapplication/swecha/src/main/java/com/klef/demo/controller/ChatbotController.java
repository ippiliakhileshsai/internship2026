package com.klef.demo.controller;

import com.klef.demo.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
@CrossOrigin("*")
public class ChatbotController {

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/ask")
    public Mono<ResponseEntity<Map<String, String>>> askChatbot(@RequestBody Map<String, String> payload) {
        String query = payload.get("query");
        String role = payload.get("role");

        if (query == null || query.trim().isEmpty()) {
            Map<String, String> err = new HashMap<>();
            err.put("response", "Please provide a valid query.");
            return Mono.just(ResponseEntity.badRequest().body(err));
        }

        if (role == null) {
            role = "Patient"; // fallback
        }

        return chatbotService.getChatResponse(query, role)
                .map(response -> {
                    Map<String, String> resBody = new HashMap<>();
                    resBody.put("response", response);
                    return ResponseEntity.ok(resBody);
                });
    }
}
