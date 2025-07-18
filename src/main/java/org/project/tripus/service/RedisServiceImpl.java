package org.project.tripus.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Duration;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.project.tripus.util.RedisKeyFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisServiceImpl implements RedisService {

    private final RedisTemplate<String, String> redisTemplate;
    private final RedisKeyFactory redisKeyFactory;
    private final ObjectMapper objectMapper;

    @Value("${jwt.refresh_token_expiration_time}")
    private long refreshTokenExpirationTime;

    public void saveRefreshToken(Long userId, String refreshToken) {
        redisTemplate.opsForValue()
            .set(redisKeyFactory.refreshTokenKey(userId), refreshToken, refreshTokenExpirationTime, TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(Long userId) {
        return redisTemplate.opsForValue()
            .get(redisKeyFactory.refreshTokenKey(userId));
    }

    public void saveIdempotencyKey(String idempotencyKey, Object object, Duration duration) throws JsonProcessingException {
        String value = objectMapper.writeValueAsString(object);

        redisTemplate.opsForValue()
            .set(redisKeyFactory.idempotencyKey(idempotencyKey), value, duration);
    }

    public Object getIdempotencyKey(String idempotencyKey) throws JsonProcessingException {
        String value = redisTemplate.opsForValue()
            .get(redisKeyFactory.idempotencyKey(idempotencyKey));

        return convertToObject(value);
    }

    public void deleteIdempotencyKey(String idempotencyKey) {
        redisTemplate.delete(redisKeyFactory.idempotencyKey(idempotencyKey));
    }

    private Object convertToObject(String value) throws JsonProcessingException {
        if(value == null) {
            return null;
        }

        return objectMapper.readValue(value, Object.class);
    }
}
