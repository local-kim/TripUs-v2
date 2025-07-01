package org.project.tripus.service;

import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.service.input.LoginInputDto;
import org.project.tripus.dto.service.output.LoginOutputDto;
import org.project.tripus.dto.service.output.ReissueOutputDto;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.security.CustomUserDetails;
import org.project.tripus.util.JwtUtil;
import org.project.tripus.util.JwtUtil.TokenStatus;
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

    /**
     * 아이디와 비밀번호가 일치하면 Access Token과 Refresh Token을 발급합니다.
     *
     * @param input 로그인 정보가 담긴 DTO
     * @return Access Token과 Refresh Token이 담긴 DTO
     * @throws CustomException 비밀번호가 일치하지 않는 경우 {@code USER_NOT_FOUND} 예외를 발생시킵니다.
     */
    public LoginOutputDto login(LoginInputDto input) {
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(input.getUsername());

        // 비밀번호 일치하는지 확인
        if(!passwordEncoder.matches(input.getPassword(), userDetails.getPassword())) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        // Access Token, Refresh Token 발급
        String accessToken = jwtUtil.generateAccessToken(userDetails.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

        // Redis에 Refresh Token 저장
        redisService.saveRefreshToken(userDetails.getId(), refreshToken);

        return LoginOutputDto.builder()
            .accessToken(accessToken)
            .refreshToken(refreshToken)
            .build();
    }

    /**
     * Refresh Token이 유효하면 Access Token과 Refresh Token을 재발급합니다.
     *
     * @param refreshToken 기존의 Refresh Token
     * @return 재발급한 Access Token과 Refresh Token이 담긴 DTO
     * @throws CustomException Refresh Token이 유효하지 않거나 저장된 Refresh Token과 일치하지 않는 경우 {@code AUTHENTICATION_FAILED} 예외를 발생시킵니다.
     */
    public ReissueOutputDto reissue(String refreshToken) {
        // Refresh Token 유효성 검사
        TokenStatus tokenStatus = jwtUtil.validateToken(refreshToken);

        if(tokenStatus != TokenStatus.VALID) {
            throw new CustomException(ErrorCode.AUTHENTICATION_FAILED);
        }

        // Redis에 저장된 Refresh Token과 일치하는지 확인
        String username = jwtUtil.getUsernameFromToken(refreshToken);
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
        Long userId = userDetails.getId();

        String savedRefreshToken = redisService.getRefreshToken(userId);

        if(!refreshToken.equals(savedRefreshToken)) {
            throw new CustomException(ErrorCode.AUTHENTICATION_FAILED);
        }

        // Access Token, Refresh Token 재발급
        String newAccessToken = jwtUtil.generateAccessToken(userDetails.getUsername());
        String newRefreshToken = jwtUtil.generateRefreshToken(userDetails.getUsername());

        // Redis에 새 Refresh Token 저장
        redisService.saveRefreshToken(userDetails.getId(), newRefreshToken);

        return ReissueOutputDto.builder()
            .accessToken(newAccessToken)
            .refreshToken(newRefreshToken)
            .build();
    }
}
