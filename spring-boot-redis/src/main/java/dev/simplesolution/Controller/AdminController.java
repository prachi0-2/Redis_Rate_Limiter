package dev.simplesolution.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private PolicyService policyService;

    private final RateLimiter rateLimiter;

    // In-memory stores (can be replaced with Redis)
    private final List<Map<String, Object>> requestLogs = Collections.synchronizedList(new ArrayList<>());
    private final Map<String, Policy> policies = new ConcurrentHashMap<>();
    private final Map<String, UserStats> userStats = new ConcurrentHashMap<>();

    public AdminController(RateLimiter rateLimiter) {
        this.rateLimiter = rateLimiter;

        // Default policies for demo users
        policies.put("john", new Policy("john", 10, 1.0));   // 10 req/min
        policies.put("alice", new Policy("alice", 5, 0.5));
    }

    // ----------------- USERS -----------------
    @GetMapping("/users")
    public ResponseEntity<List<UserStats>> getAllUsers() {
        // Attach current policy info
        userStats.forEach((userId, stats) -> {
            Policy p = policies.getOrDefault(userId, new Policy(userId, 10, 1.0));
            stats.setLimit(p.getLimit());
        });
        return ResponseEntity.ok(new ArrayList<>(userStats.values()));
    }

    @PostMapping("/users/{userId}/reset")
    public ResponseEntity<String> resetUser(@PathVariable String userId) {
        UserStats stats = userStats.get(userId);
        if (stats != null) {
            stats.reset();
            return ResponseEntity.ok(" Rate limit reset for user: " + userId);
        } else {
            return ResponseEntity.badRequest().body(" User not found");
        }
    }

    // ----------------- LOGS -----------------
    @GetMapping("/logs")
    public ResponseEntity<List<Map<String, Object>>> getLogs() {
        return ResponseEntity.ok(requestLogs);
    }

    // ----------------- GLOBAL STATS -----------------
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        long totalUsers = userStats.size();
        long totalRequests = requestLogs.size();
        long blockedRequests = requestLogs.stream().filter(l -> l.get("status").equals(429)).count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", totalUsers);
        stats.put("totalRequests", totalRequests);
        stats.put("blockedRequests", blockedRequests);
        return ResponseEntity.ok(stats);
    }

    // ----------------- POLICIES -----------------
    @GetMapping("/policies")
    public ResponseEntity<List<Policy>> getPolicies() {
        return ResponseEntity.ok(new ArrayList<>(policies.values()));
    }

    @PutMapping("/policies/{userId}")
    public ResponseEntity<?> updatePolicy(@PathVariable String userId, @RequestBody Policy newPolicy) {
        if (newPolicy == null || newPolicy.getLimit() <= 0 || newPolicy.getRefillRate() <= 0) {
            return ResponseEntity.badRequest().body(" Invalid policy values");
        }
        policies.put(userId, new Policy(userId, newPolicy.getLimit(), newPolicy.getRefillRate()));
        policyService.updatePolicy(userId, newPolicy.getLimit(), newPolicy.getRefillRate());
        return ResponseEntity.ok("✅ Policy updated for user " + userId);
    }

    // ----------------- INTERNAL UTILITY -----------------
    public void logRequest(String userId, String endpoint, int status) {
        Map<String, Object> log = new LinkedHashMap<>();
        log.put("timestamp", LocalDateTime.now().toString());
        log.put("userId", userId);
        log.put("endpoint", endpoint);
        log.put("status", status);
        requestLogs.add(0, log);

        UserStats stats = userStats.getOrDefault(userId, new UserStats(userId));
        stats.incrementRequests();
        if (status == 429) {
            stats.incrementBlocked();
            stats.setStatus("limited");
        } else {
            stats.setStatus("active");
        }
        stats.setLastRequest(LocalDateTime.now().toString());

        Policy p = policies.getOrDefault(userId, new Policy(userId, 10, 1.0));
        stats.setLimit(p.getLimit());
        userStats.put(userId, stats);
    }

    // ----------------- INNER CLASSES -----------------
    static class Policy {
        private String userId;
        private int limit;
        private double refillRate;   // <---- added

        public Policy() {}
        public Policy(String userId, int limit, double refillRate) {
            this.userId = userId;
            this.limit = limit;
            this.refillRate = refillRate;
        }

        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }

        public int getLimit() { return limit; }
        public void setLimit(int limit) { this.limit = limit; }

        public double getRefillRate() { return refillRate; }
        public void setRefillRate(double refillRate) { this.refillRate = refillRate; }
    }

    static class UserStats {
        private String userId;
        private int requests;
        private int blocked;
        private int limit;
        private String lastRequest;
        private String status = "active";
        private int resetInSec = 60;

        public UserStats() {}
        public UserStats(String userId) { this.userId = userId; }

        public void incrementRequests() { this.requests++; }
        public void incrementBlocked() { this.blocked++; }
        public void reset() {
            this.requests = 0;
            this.blocked = 0;
            this.status = "active";
            this.lastRequest = LocalDateTime.now().toString();
        }

        public String getUserId() { return userId; }
        public int getRequests() { return requests; }
        public int getBlocked() { return blocked; }
        public int getLimit() { return limit; }
        public String getLastRequest() { return lastRequest; }
        public String getStatus() { return status; }
        public int getResetInSec() { return resetInSec; }

        public void setLimit(int limit) { this.limit = limit; }
        public void setLastRequest(String lastRequest) { this.lastRequest = lastRequest; }
        public void setStatus(String status) { this.status = status; }
    }

    // ----------------- CORS CONFIG -----------------
//    @Configuration
//    public static class CorsConfig {
//        @Bean
//        public WebMvcConfigurer corsConfigurer() {
//            return new WebMvcConfigurer() {
//                @Override
//                public void addCorsMappings(CorsRegistry registry) {
//                    registry.addMapping("/**")
//                            .allowedOrigins("*")
//                            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
//                }
//            };
//        }
//    }
}
