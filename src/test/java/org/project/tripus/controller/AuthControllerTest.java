package org.project.tripus.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.project.tripus.UserFixture;
import org.project.tripus.dto.controller.request.LoginRequestDto;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

@AutoConfigureMockMvc
@Transactional
@SpringBootTest
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    String rawPassword = "test-password1!";

    UserEntity userEntity;

    @BeforeEach
    void setUp() {
        userEntity = UserFixture.generate(passwordEncoder.encode(rawPassword));
        userRepository.save(userEntity);
    }

    @DisplayName("로그인 API")
    @Nested
    class LoginTest {

        @DisplayName("성공")
        @Test
        void shouldReturnOk_whenSuccessful() throws Exception {
            // given
            LoginRequestDto request = LoginRequestDto.builder()
                .username(userEntity.getUsername())
                .password(rawPassword)
                .build();

            // when
            mockMvc.perform(post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                // then
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").isString())
                .andDo(print());
        }

        @DisplayName("실패 - 가입되지 않은 아이디")
        @Test
        void shouldReturnNotFound_whenEmailDoesNotExist() throws Exception {
            // given
            LoginRequestDto request = LoginRequestDto.builder()
                .username("wrong-user")
                .password("test-password1!")
                .build();

            // when
            mockMvc.perform(post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                // then
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value(ErrorCode.USER_NOT_FOUND.name()))
                .andDo(print());
        }

        @DisplayName("실패 - 비밀번호가 일치하지 않음")
        @Test
        void shouldReturnNotFound_whenPasswordDoesNotMatch() throws Exception {
            // given
            LoginRequestDto request = LoginRequestDto.builder()
                .username(userEntity.getUsername())
                .password("wrong-password1!")
                .build();

            // when
            mockMvc.perform(post("/auth/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(request)))
                // then
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.error.code").value(ErrorCode.USER_NOT_FOUND.name()))
                .andDo(print());
        }
    }
}