package org.project.tripus.util;

import org.springframework.stereotype.Component;

@Component
public class RedisKeyFactory {

    public String refreshTokenKey(Long userId) {
        return "refresh-token:" + userId;
    }
}
