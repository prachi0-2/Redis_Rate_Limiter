package dev.simplesolution.Controller;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PolicyService {

    private final Map<String, UserPolicy> userPolicies = new ConcurrentHashMap<>();

    public PolicyService() {
        // default example policies
        userPolicies.put("john", new UserPolicy(10, 1.0 / 6.0));  // 10 tokens, 1 token every 6 sec
        userPolicies.put("alice", new UserPolicy(5, 1.0 / 10.0));
    }

    public UserPolicy getPolicy(String userId) {
        return userPolicies.getOrDefault(userId, new UserPolicy(5, 1.0 / 10.0));
    }

    // ✅ Removed static
    public void updatePolicy(String userId, int maxTokens, double refillRate) {
        userPolicies.put(userId, new UserPolicy(maxTokens, refillRate));
    }


    public static class UserPolicy {
        private int maxTokens;
        private double refillRate;

        public UserPolicy(int maxTokens, double refillRate) {
            this.maxTokens = maxTokens;
            this.refillRate = refillRate;
        }

        public int getMaxTokens() { return maxTokens; }
        public double getRefillRate() { return refillRate; }


    }


}
