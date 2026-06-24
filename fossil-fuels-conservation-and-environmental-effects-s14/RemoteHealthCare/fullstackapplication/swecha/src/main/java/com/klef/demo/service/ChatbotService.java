package com.klef.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatbotService {

    private final WebClient webClient;
    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
    // Using the key provided in the Python script
    private static final String API_KEY = "YOUR_GROQ_API_KEY_HERE";

    public ChatbotService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(GROQ_API_URL).build();
    }

    public Mono<String> getChatResponse(String query, String role) {
        
        String systemInstruction = buildSystemPromptForRole(role);

        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", systemInstruction);

        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", query);

        List<Map<String, Object>> messages = new ArrayList<>();
        messages.add(systemMessage);
        messages.add(userMessage);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "llama-3.3-70b-versatile");
        requestBody.put("messages", messages);
        requestBody.put("temperature", 0.6);

        return this.webClient.post()
                .header("Authorization", "Bearer " + API_KEY)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                        if (choices != null && !choices.isEmpty()) {
                            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                            return (String) message.get("content");
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return "Sorry, I am having trouble connecting to the medical AI core right now.";
                });
    }

    private String buildSystemPromptForRole(String role) {
        String baseInstruction = "You are an Elite Medical Intelligence System, the most advanced AI assistant " +
                "integrated into the CarePortal healthcare ecosystem. You must deliver highly sophisticated, structured, " +
                "and precisely formatted markdown responses. Your tone must be impeccably professional, empathetic, and premium.\n\n" +
                "CRITICAL EMERGENCY GUARDRAIL:\n" +
                "If the user describes a life-threatening symptom, instantly bypass the conversation and reply with: " +
                "'**[EMERGENCY_ALERT]** Please seek immediate emergency medical care. I strongly advise utilizing the **SOS** " +
                "button on our dashboard right now to dispatch an ambulance to your location.'\n\n";

        if ("Patient".equalsIgnoreCase(role)) {
            return baseInstruction + "You are speaking to a Patient. " +
                    "1. EMPATHY & LUXURY CARE: Begin with a warm, highly empathetic acknowledgment of their concern, making them feel exclusively cared for.\n" +
                    "2. ELEGANT EXPLANATIONS: Provide educational insights using clear, elegant language. Use markdown formatting (bolding, bullet points) for readability.\n" +
                    "3. HOLISTIC PRECAUTIONS: Offer a beautifully structured list of home remedies or lifestyle precautions.\n" +
                    "4. SAFEGUARD: Always conclude gracefully with a reminder that you are an AI assistant and they should consult their primary physician for formal diagnosis.";
        } else if ("Doctor".equalsIgnoreCase(role) || "Admin".equalsIgnoreCase(role) || "Manager".equalsIgnoreCase(role)) {
            return baseInstruction + "You are speaking to a " + role + " (Clinical Professional). " +
                    "1. ELITE PROFESSIONALISM: Provide concise, highly accurate, and analytical medical insights. Use sophisticated medical terminology appropriately.\n" +
                    "2. STRUCTURED DATA: Present diagnostic suggestions, differential diagnoses, or operational metrics in well-formatted markdown lists or tables.\n" +
                    "3. AUTOMATION PARTNER: Offer your advanced capabilities to draft clinical notes, summarize patient history, or optimize clinical workflows.";
        }
        
        return baseInstruction;
    }
}
