package dev.simplesolution.Controller;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DynamicPolicyEngine {

    private final LoadMonitor loadMonitor;
    private final PolicyService policyService;

    private final int DEFAULT_CAPACITY = 10;
    private final double DEFAULT_REFILL = 1.0;

    public DynamicPolicyEngine(LoadMonitor loadMonitor, PolicyService policyService) {
        this.loadMonitor = loadMonitor;
        this.policyService = policyService;
    }

    @Scheduled(fixedRate = 5000) // every 5 seconds
    public void adjustPolicies() {
        double load = loadMonitor.getCurrentCpuLoad(); // 0.0 to 1.0
        Set<Object> users = policyService.getAllUsers();
        if (users == null) return;

        for (Object userObj : users) {
            String userId = userObj.toString();

            // dynamically scale tokens and refill rate based on CPU load
            int newCapacity = Math.max(1, (int)(DEFAULT_CAPACITY * (1 - load))); // at least 1
            double newRefill = Math.max(0.1, DEFAULT_REFILL * (1 - load));        // at least 0.1/sec

            policyService.updatePolicy(userId, newCapacity, newRefill);

            System.out.println(String.format(
                    "⚡ User: %s | Load: %.2f | Tokens: %d | Refill/sec: %.2f",
                    userId, load, newCapacity, newRefill
            ));
        }
    }
}
