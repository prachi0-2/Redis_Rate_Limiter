package dev.simplesolution.Controller;

public class RateLimiterResponse {
    private final boolean allowed;
    private final long value; // can represent tokens left (if allowed) or retry-after seconds (if denied)

    public RateLimiterResponse(boolean allowed, long value) {
        this.allowed = allowed;
        this.value = value;
    }

    public boolean isAllowed() {
        return allowed;
    }

    public long getValue() {
        return value;
    }
}
