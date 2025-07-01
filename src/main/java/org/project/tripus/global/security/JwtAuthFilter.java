package org.project.tripus.global.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.global.response.ErrorResponse;
import org.project.tripus.util.JwtUtil;
import org.project.tripus.util.JwtUtil.TokenStatus;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization");

        // JWT가 헤더에 있는 경우
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            // JWT 유효성 검증
            TokenStatus tokenStatus = jwtUtil.validateToken(token);

            if(tokenStatus == TokenStatus.VALID) {
                String username = jwtUtil.getUsernameFromToken(token);

                // 유저 존재 시 userDetails 생성
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

                // UserDetails, Role -> 인증 객체 생성
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // Request의 Security Context에 인증 정보 저장
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else if(tokenStatus == TokenStatus.EXPIRED) {
                CommonResponse<Object> responseBody = CommonResponse.fail(ErrorResponse.builder()
                    .code(ErrorCode.TOKEN_EXPIRED.name())
                    .message(List.of(ErrorCode.TOKEN_EXPIRED.getMessage()))
                    .build());

                ObjectMapper mapper = new ObjectMapper();

                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(mapper.writeValueAsString(responseBody));

                return;
            } else if(tokenStatus == TokenStatus.INVALID) {
                CommonResponse<Object> responseBody = CommonResponse.fail(ErrorResponse.builder()
                    .code(ErrorCode.AUTHENTICATION_FAILED.name())
                    .message(List.of(ErrorCode.AUTHENTICATION_FAILED.getMessage()))
                    .build());

                ObjectMapper mapper = new ObjectMapper();

                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(mapper.writeValueAsString(responseBody));

                return;
            }
        }

        filterChain.doFilter(request, response); // 다음 필터로 넘기기
    }
}
