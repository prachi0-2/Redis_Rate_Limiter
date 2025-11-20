package dev.simplesolution.Controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class PolicyService {

    private final RedisTemplate<String, Object> redisTemplate;

    private final int DEFAULT_CAPACITY = 10;  // default max tokens
    private final double DEFAULT_REFILL = 1.0; // tokens per second

    public PolicyService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    private String getKey(String userId) {
        return "rate_limit:" + userId;
    }

    // Get or create user policy
    public UserPolicy getPolicy(String userId) {
        String key = getKey(userId);

        Object tokensObj = redisTemplate.opsForHash().get(key, "tokens");
        Object capacityObj = redisTemplate.opsForHash().get(key, "capacity");
        Object refillObj = redisTemplate.opsForHash().get(key, "refillRate");

        if (tokensObj == null || capacityObj == null || refillObj == null) {
            // Create default bucket
            updatePolicy(userId, DEFAULT_CAPACITY, DEFAULT_REFILL);
            tokensObj = DEFAULT_CAPACITY;
            capacityObj = DEFAULT_CAPACITY;
            refillObj = DEFAULT_REFILL;
        }

        int tokens = Integer.parseInt(tokensObj.toString());
        int capacity = Integer.parseInt(capacityObj.toString());
        double refillRate = Double.parseDouble(refillObj.toString());

        return new UserPolicy(capacity, refillRate, tokens);
    }

    // Update or create a user token bucket
    public void updatePolicy(String userId, int capacity, double refillRate) {
        String key = getKey(userId);
        redisTemplate.opsForHash().put(key, "capacity", capacity);
        redisTemplate.opsForHash().put(key, "refillRate", refillRate);
        redisTemplate.opsForHash().putIfAbsent(key, "tokens", capacity);
        redisTemplate.opsForHash().putIfAbsent(key, "lastRefill", System.currentTimeMillis());

        // Add userId to the Redis Set
        redisTemplate.opsForSet().add("rate_limit:users", userId);
    }

    // Consume a token, returns true if allowed
    public boolean consumeToken(String userId) {
        String key = getKey(userId);
        UserPolicy policy = getPolicy(userId);

        long lastRefillTime = redisTemplate.opsForHash().get(key, "lastRefill") != null ?
                (long) redisTemplate.opsForHash().get(key, "lastRefill") : System.currentTimeMillis();

        long now = System.currentTimeMillis();
        double refill = ((now - lastRefillTime) / 1000.0) * policy.getRefillRate();

        int currentTokens = policy.getTokens() + (int) refill;
        currentTokens = Math.min(currentTokens, policy.getMaxTokens());

        if (currentTokens > 0) {
            currentTokens--;
            redisTemplate.opsForHash().put(key, "tokens", currentTokens);
            redisTemplate.opsForHash().put(key, "lastRefill", now);
            return true;
        } else {
            redisTemplate.opsForHash().put(key, "tokens", 0);
            redisTemplate.opsForHash().put(key, "lastRefill", now);
            return false;
        }
    }

    // Get all tracked users
    public Set<Object> getAllUsers() {
        return redisTemplate.opsForSet().members("rate_limit:users");
    }

    public static class UserPolicy {
        private final int maxTokens;
        private final double refillRate;
        private final int tokens;

        public UserPolicy(int maxTokens, double refillRate, int tokens) {
            this.maxTokens = maxTokens;
            this.refillRate = refillRate;
            this.tokens = tokens;
        }

        public int getMaxTokens() { return maxTokens; }
        public double getRefillRate() { return refillRate; }
        public int getTokens() { return tokens; }
    }
}
