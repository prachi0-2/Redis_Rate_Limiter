package dev.simplesolution.Controller;

//import org.springframework.rg.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class
TestController {
    private final RateLimiter rateLimiter;
    private final AdminController adminController;

    public TestController(RateLimiter rateLimiter, AdminController adminController) {
        this.rateLimiter = rateLimiter;
        this.adminController = adminController;
    }

    @GetMapping("/test")
    public ResponseEntity<String> testRateLimit(@RequestParam String userId) {
        RateLimiterResponse response = rateLimiter.isAllowed(userId);
        int statusCode;

        ResponseEntity<String> result;


        if (response.isAllowed()) {
            statusCode = 200;
            result= ResponseEntity.ok(
                    " Request allowed for user: " + userId +
                            " | Tokens left: " + response.getValue()
            );
        } else {
            statusCode = 429;
            result= ResponseEntity.status(429) // HTTP 429 Too Many Requests
                    .header("Retry-After", String.valueOf(response.getValue())) // HTTP header
                    .body(" Rate limit exceeded for user: " + userId +
                            " | Retry after: " + response.getValue() + " seconds");
        }

        // Log this request
        adminController.logRequest(userId, "/test", statusCode);
        return result;
    }
}

//http://localhost:8080/test?userId=john
