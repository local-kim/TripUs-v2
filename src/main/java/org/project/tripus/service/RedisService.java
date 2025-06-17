package org.project.tripus.service;

public interface RedisService {

    void saveRefreshToken(Long userId, String refreshToken);
}
