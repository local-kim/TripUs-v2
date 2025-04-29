package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.input.LoginInput;
import org.project.tripus.dto.output.LoginOutput;
import org.project.tripus.dto.request.LoginRequest;
import org.project.tripus.dto.response.LoginResponse;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.mapper.AuthMapper;
import org.project.tripus.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "인증 API", description = "인증에 관한 API")
@RequestMapping("/auth")
@RestController
public class AuthController {

    private final AuthService authService;
    private final AuthMapper authMapper;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "로그인 성공"),
        @ApiResponse(responseCode = "400", description = "잘못된 입력 형식"),
        @ApiResponse(responseCode = "404", description = "1. 가입되지 않은 아이디 2. 비밀번호가 일치하지 않음"),
    })
    @Operation(summary = "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        LoginInput input = authMapper.toInput(request);
        LoginOutput output = authService.login(input);
        LoginResponse response = authMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.OK)
            .body(CommonResponse.success("로그인 성공", response));
    }

//    @PostMapping("/kakaologin")
//    public MemberSecurityDto kakaoLogin(@RequestBody LoginDto loginDto) {
//        MemberSecurityDto member = memberService.getLoginInfo2(loginDto.getId());    // 프로필 사진도 같이 받아옴
////        System.out.println(member);
//
//        return member;
//    }
}