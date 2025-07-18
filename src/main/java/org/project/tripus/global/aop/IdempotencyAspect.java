package org.project.tripus.global.aop;

import jakarta.servlet.http.HttpServletRequest;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.project.tripus.global.annotation.Idempotent;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.service.RedisService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@RequiredArgsConstructor
@Component
@Aspect
public class IdempotencyAspect {

    private final RedisService redisService;

    private static final String PROCESSING = "PROCESSING";
    private static final Duration PROCESSING_TTL = Duration.ofMinutes(1);
    private static final Duration RESPONSE_TTL = Duration.ofMinutes(10);

    @Around("@annotation(idempotent)")
    public Object handleIdempotency(ProceedingJoinPoint joinPoint, Idempotent idempotent) throws Throwable {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        String idempotencyKey = request.getHeader("Idempotency-Key");

        // 헤더에 멱등키가 없는 경우 -> 400 에러 반환
        if(idempotencyKey == null || idempotencyKey.isBlank()) {
            throw new CustomException(ErrorCode.IDEMPOTENCY_KEY_MISSING);
        }

        Object value = redisService.getIdempotencyKey(idempotencyKey);

        // 요청이 처리 중인 경우 -> 409 에러 반환
        if(PROCESSING.equals(value)) {
            throw new CustomException(ErrorCode.PROCESSING_REQUEST);
        }

        // 이미 처리된 요청인 경우 -> 캐싱된 Body를 ResponseEntity에 담아 Status 지정하여 반환
        if(value != null) {
            return ResponseEntity.status(idempotent.status()).body(value);
        }

        // 처음 들어온 요청인 경우
        // 요청 처리 전 PROCESSING 저장
        redisService.saveIdempotencyKey(idempotencyKey, PROCESSING, PROCESSING_TTL);

        try {
            Object result = joinPoint.proceed();

            // 요청 처리 성공한 경우 -> ResponseEntity의 Body만 캐싱
            if(result instanceof ResponseEntity<?> response) {
                Object body = response.getBody();
                redisService.saveIdempotencyKey(idempotencyKey, body, RESPONSE_TTL);
            }

            return result;
        } catch(Exception e) {
            // 요청 처리 실패한 경우(또는 캐싱 실패한 경우) -> 저장된 키 삭제
            redisService.deleteIdempotencyKey(idempotencyKey);
            throw e;
        }
    }
}
