package org.project.tripus.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import java.time.Duration;

public interface RedisService {

    void saveRefreshToken(Long userId, String refreshToken);

    String getRefreshToken(Long userId);

    void saveIdempotencyKey(String idempotencyKey, Object value, Duration duration) throws JsonProcessingException;

    Object getIdempotencyKey(String idempotencyKey) throws JsonProcessingException;

    void deleteIdempotencyKey(String idempotencyKey);
}
