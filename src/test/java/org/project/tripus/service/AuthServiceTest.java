package org.project.tripus.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.project.tripus.dto.service.input.LoginInputDto;
import org.project.tripus.dto.service.output.LoginOutputDto;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorCode;
import org.project.tripus.global.security.CustomUserDetails;
import org.project.tripus.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @InjectMocks
    AuthServiceImpl authService;

    @Mock
    UserDetailsService userDetailsService;

    @Spy
    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Mock
    JwtUtil jwtUtil;

    @Mock
    RedisService redisService;

    @DisplayName("로그인 메서드")
    @Nested
    class LoginTest {

        @DisplayName("로그인 성공하면 JWT 토큰을 반환함")
        @Test
        void shouldReturnJwtToken_whenSuccessful() {
            // given
            String expectedAccessToken = "mock-access-token";
            String expectedRefreshToken = "mock-refresh-token";
            String rawPassword = "test-password1!";
            String encodedPassword = passwordEncoder.encode(rawPassword);

            LoginInputDto input = LoginInputDto.builder()
                .username("test-market@domain.com")
                .password(rawPassword)
                .build();

            UserDetails userDetails = new CustomUserDetails(UserEntity.builder()
                .id(1L)
                .username("test-user")
                .password(encodedPassword)
                .build());

            when(userDetailsService.loadUserByUsername(input.getUsername()))
                .thenReturn(userDetails);

            when(jwtUtil.generateAccessToken(userDetails.getUsername()))
                .thenReturn(expectedAccessToken);

            when(jwtUtil.generateRefreshToken(userDetails.getUsername()))
                .thenReturn(expectedRefreshToken);

            // when
            LoginOutputDto output = authService.login(input);

            // then
            assertEquals(expectedAccessToken, output.getAccessToken());
            assertEquals(expectedRefreshToken, output.getRefreshToken());
            verify(redisService).saveRefreshToken(any(), eq(expectedRefreshToken));
        }

        @DisplayName("비밀번호가 일치하지 않으면 예외를 던짐")
        @Test
        void shouldThrowException_whenPasswordDoesNotMatch() {
            // given
            String wrongRawPassword = "wrong-password1!";
            String encodedPassword = passwordEncoder.encode("test-password1!");

            LoginInputDto input = LoginInputDto.builder()
                .username("test-market@domain.com")
                .password(wrongRawPassword)
                .build();

            UserDetails userDetails = new CustomUserDetails(UserEntity.builder()
                .username("test-market@domain.com")
                .password(encodedPassword)
                .build());

            when(userDetailsService.loadUserByUsername(input.getUsername()))
                .thenReturn(userDetails);

            // when
            CustomException exception = assertThrows(CustomException.class, () -> authService.login(input));

            // then
            assertEquals(ErrorCode.USER_NOT_FOUND, exception.getErrorCode());
        }
    }
}