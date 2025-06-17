package org.project.tripus.service;

import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.service.input.LoginInputDto;
import org.project.tripus.dto.service.output.LoginOutputDto;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorEnum;
import org.project.tripus.global.security.CustomUserDetails;
import org.project.tripus.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthServiceImpl implements AuthService {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisService redisService;

    @Override
    public LoginOutputDto login(LoginInputDto input) {
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(input.getUsername());

        // 비밀번호 일치하는지 확인
        if(!passwordEncoder.matches(input.getPassword(), userDetails.getPassword())) {
            throw new CustomException(ErrorEnum.USER_NOT_FOUND);
        }

        // Access Token, Refresh Token 발급
        String accessToken = jwtUtil.generateAccessToken(userDetails.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

        // Refresh Token을 Redis에 저장
        redisService.saveRefreshToken(userDetails.getId(), refreshToken);

        return LoginOutputDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }
}
