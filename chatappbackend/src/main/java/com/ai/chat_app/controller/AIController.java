package com.ai.chat_app.controller;

import com.ai.chat_app.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend requests
public class AIController {

    private AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/ai-suggestion")
    public ResponseEntity<String> aiResponse(@RequestBody Map<String, String> body) {
        System.out.println("Received request body: " + body); // Debugging
        if (!body.containsKey("prompt") || body.get("prompt") == null) {
            return ResponseEntity.badRequest().body("Missing 'prompt' key in request body");
        }

        String response = aiService.getAiResponse(body.get("prompt"));

        if (response == null) {
            return ResponseEntity.status(500).body("Failed to get AI response");
        }

        return ResponseEntity.ok(response);
    }
}
