package com.ai.chat_app.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Service
public class AIService {
    private WebClient webClient;
    @Value("${gemini-api-url}")
    private String GEMINI_API_URL;
    @Value("${gemini-api-key}")
    private String GEMINI_API_KEY;

    public AIService(WebClient.Builder webClient) {
        this.webClient = webClient.build();
    }

    public String getAiResponse(String prompt) {

        Map<String, Object> requestBody = Map.of(
                "contents", new Object[] {
                        Map.of("parts", new Object[] {
                            Map.of("text", prompt)
                        })
                }
        );

        ResponseEntity<Map> response = webClient.post()
                .uri(GEMINI_API_URL + GEMINI_API_KEY)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .toEntity(Map.class)
                .block();


        String res = retrieveResponse(response);

        return res;

    }

    private String retrieveResponse(ResponseEntity<Map> response) {
        if (response == null || response.getBody() == null) {
            return null;
        }

        Object candidatesObj = response.getBody().get("candidates");
        if (!(candidatesObj instanceof List<?> candidates) || candidates.isEmpty()) {
            return null;
        }

        Object firstCandidate = candidates.get(0);
        if (!(firstCandidate instanceof Map<?, ?> firstCandidateMap)) {
            return null;
        }

        Object contentObj = firstCandidateMap.get("content");
        if (!(contentObj instanceof Map<?, ?> contentMap)) {
            return null;
        }

        Object partsObj = contentMap.get("parts");
        if (!(partsObj instanceof List<?> parts) || parts.isEmpty()) {
            return null;
        }

        Object textObj = parts.get(0);
        if (textObj instanceof Map<?, ?> textMap) {
            return (String) textMap.get("text");
        }

        return null;
    }

}
