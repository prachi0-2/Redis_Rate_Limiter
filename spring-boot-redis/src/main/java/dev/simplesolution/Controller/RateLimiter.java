package dev.simplesolution.Controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Collections;
import java.util.List;

@Component
public class RateLimiter {

    private final RedisTemplate<String, String> redisTemplate;
    private final PolicyService policyService;
    private final DefaultRedisScript<List> script;
    private static final int REQUESTED_TOKENS = 1;

    public RateLimiter(RedisTemplate<String, String> redisTemplate, PolicyService policyService) {
        this.redisTemplate = redisTemplate;
        this.policyService = policyService;

        // ✅ Lua Script for Token Bucket
        String lua = ""
                // --- ✅ SAFETY: Delete key if wrong type ---
                + "local keyType = redis.call('TYPE', KEYS[1]).ok "
                + "if keyType ~= 'hash' and keyType ~= 'none' then "
                + "    redis.call('DEL', KEYS[1]) "
                + "end "

                // --- Arguments ---
                + "local max_tokens = tonumber(ARGV[1]) "
                + "local refill_rate = tonumber(ARGV[2]) "
                + "local now = tonumber(ARGV[3]) "
                + "local requested_tokens = tonumber(ARGV[4]) "

                // --- Read token bucket ---
                + "local bucket = redis.call('HMGET', KEYS[1], 'tokens', 'last_refill') "
                + "local tokens = tonumber(bucket[1]) "
                + "local last_refill = tonumber(bucket[2]) "

                // --- Initialize if new ---
                + "if tokens == nil then tokens = max_tokens end "
                + "if last_refill == nil then last_refill = now end "

                // --- Refill logic ---
                + "local delta = math.max(0, now - last_refill) "
                + "tokens = math.min(max_tokens, tokens + delta * refill_rate) "

                // --- Check allowance ---
                + "local allowed = tokens >= requested_tokens "
                + "local retry_after = 0 "

                + "if allowed then "
                + "    tokens = tokens - requested_tokens "
                + "else "
                + "    local needed = requested_tokens - tokens "
                + "    retry_after = math.ceil(needed / refill_rate) "
                + "end "

                // --- Store new values ---
                + "redis.call('HMSET', KEYS[1], 'tokens', tokens, 'last_refill', now) "

                // --- Return {allowed, remaining or retry_after} ---
                + "if allowed then "
                + "    return {1, tokens} "
                + "else "
                + "    return {0, retry_after} "
                + "end";

        script = new DefaultRedisScript<>();
        script.setScriptText(lua);
        script.setResultType(List.class);
    }

    public RateLimiterResponse isAllowed(String userId) {
        PolicyService.UserPolicy policy = policyService.getPolicy(userId);
        String key = "bucket:" + userId;
        long now = Instant.now().getEpochSecond();

        List<String> args = List.of(
                String.valueOf(policy.getMaxTokens()),
                String.valueOf(policy.getRefillRate()),
                String.valueOf(now),
                String.valueOf(REQUESTED_TOKENS)
        );

        List<?> result = redisTemplate.execute(script, Collections.singletonList(key), args.toArray());

        if (result == null || result.size() < 2) {
            return new RateLimiterResponse(false, 0);
        }

        boolean allowed = Long.parseLong(result.get(0).toString()) == 1;
        long value = Long.parseLong(result.get(1).toString());

        return new RateLimiterResponse(allowed, value);
    }
}
