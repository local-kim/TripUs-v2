package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.controller.request.LoginRequestDto;
import org.project.tripus.dto.controller.response.LoginResponseDto;
import org.project.tripus.dto.controller.response.ReissueResponseDto;
import org.project.tripus.dto.service.input.LoginInputDto;
import org.project.tripus.dto.service.output.LoginOutputDto;
import org.project.tripus.dto.service.output.ReissueOutputDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.mapper.AuthMapper;
import org.project.tripus.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "인증 API", description = "인증, 토큰")
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService authService;
    private final AuthMapper authMapper;

    @Value("${jwt.refresh_token_expiration_time}")
    private long refreshTokenExpirationTime;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 입력 형식"),
        @ApiResponse(responseCode = "404", description = "1. 가입되지 않은 아이디 2. 비밀번호가 일치하지 않음"),
    })
    @Operation(summary = "로그인", description = "로그인 성공 시 응답 바디에 Access Token(유효기간 30분), 쿠키에 Refresh Token(유효기간 7일) 반환")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request, HttpServletResponse httpServletResponse) {
        LoginInputDto input = authMapper.toInput(request);
        LoginOutputDto output = authService.login(input);
        LoginResponseDto response = authMapper.toResponse(output);

        // Refresh Token을 담은 쿠키 생성
        ResponseCookie cookie = ResponseCookie
            .from("refreshToken", output.getRefreshToken())
            .httpOnly(true)
            .path("/")
            .maxAge(Duration.ofMillis(refreshTokenExpirationTime))
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(CommonResponse.success("로그인 성공", response));
    }

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "토큰 재발급 성공"),
        @ApiResponse(responseCode = "401", description = "Refresh Token이 유효하지 않음"),
    })
    @Operation(summary = "토큰 재발급", description = "")
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@CookieValue(required = true) String refreshToken, HttpServletResponse httpServletResponse) {
        ReissueOutputDto output = authService.reissue(refreshToken);
        ReissueResponseDto response = authMapper.toResponse(output);

        // Refresh Token을 담은 쿠키 생성
        ResponseCookie cookie = ResponseCookie
            .from("refreshToken", output.getRefreshToken())
            .httpOnly(true)
            .path("/")
            .maxAge(Duration.ofMillis(refreshTokenExpirationTime))
            .build();

        return ResponseEntity.status(HttpStatus.OK)
            .header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(CommonResponse.success("토큰 재발급 성공", response));
    }
}