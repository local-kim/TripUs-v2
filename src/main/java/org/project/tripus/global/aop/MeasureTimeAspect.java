package org.project.tripus.global.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Slf4j
@Component
@Aspect
public class MeasureTimeAspect {

    @Pointcut("@annotation(org.project.tripus.global.annotation.MeasureTime)")
    private void pointcut() {
    }

    @Around("pointcut()")
    public Object measureTime(ProceedingJoinPoint joinPoint) throws Throwable {
        StopWatch stopWatch = new StopWatch();

        try {
            stopWatch.start();
            return joinPoint.proceed();
        } finally {
            stopWatch.stop();
            log.info("{} takes {} ms", joinPoint.getSignature().toShortString(), String.format("%.2f", stopWatch.getTotalTimeSeconds() * 1000));
        }
    }
}
