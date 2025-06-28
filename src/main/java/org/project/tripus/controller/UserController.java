package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.controller.request.CreateUserRequestDto;
import org.project.tripus.dto.service.input.CreateUserInputDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.mapper.UserMapper;
import org.project.tripus.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "회원 API", description = "회원")
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "회원가입 성공"),
        @ApiResponse(responseCode = "400", description = "1. 잘못된 입력 형식 2. 이미 가입된 아이디"),
    })
    @Operation(summary = "회원가입", description = "비밀번호: 8~16자의 영문, 숫자, 특수문자를 1개 이상 포함한 문자열")
    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequestDto request) {
        CreateUserInputDto input = userMapper.toInput(request);

        userService.createMember(input);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(CommonResponse.success("회원가입 성공"));
    }
}
