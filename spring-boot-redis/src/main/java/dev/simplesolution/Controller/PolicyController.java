package dev.simplesolution.Controller;

import dev.simplesolution.Controller.PolicyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/policy")
@CrossOrigin(origins = "*")
public class PolicyController {

    private final PolicyService policyService;

    public PolicyController(PolicyService policyService) {
        this.policyService = policyService;
    }

    @PostMapping("/update/{userId}")
    public String updatePolicy(@PathVariable String userId,
                               @RequestParam int maxTokens,
                               @RequestParam double refillRate) {
        policyService.updatePolicy(userId, maxTokens, refillRate);
        return "Policy updated for user: " + userId;
    }
}
