package org.project.tripus.service;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.project.tripus.util.RedisKeyFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RedisServiceImpl implements RedisService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisKeyFactory redisKeyFactory;

    @Value("${jwt.refresh_token_expiration_time}")
    private long refreshTokenExpirationTime;

    public void saveRefreshToken(Long userId, String refreshToken) {
        redisTemplate.opsForValue()
            .set(redisKeyFactory.refreshTokenKey(userId), refreshToken, refreshTokenExpirationTime, TimeUnit.MILLISECONDS);
    }
}
