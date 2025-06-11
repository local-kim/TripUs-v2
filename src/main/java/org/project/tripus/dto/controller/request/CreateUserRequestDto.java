package org.project.tripus.dto.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@Builder
public class CreateUserRequestDto {

    @NotBlank
    @Schema(description = "아이디", example = "johndoe")
    private String username;

    @NotBlank
    @Size(min = 8, max = 16)
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^&*\\-_+=;:,.?]).*$", message = "영문, 숫자, 특수문자를 1개 이상 포함해야합니다")
    @Schema(description = "비밀번호", example = "password1!")
    private String password;

    @NotBlank
    @Schema(description = "닉네임", example = "조니")
    private String name;

    @NotBlank
    @Schema(description = "이메일", example = "johndoe@gmail.com")
    private String email;

    @NotBlank
    @Schema(description = "연락처", example = "01012345678")
    private String tel;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Schema(description = "생년월일", example = "2000-01-01")
    private LocalDate birthday;

    @NotBlank
    @Schema(description = "우편번호", example = "04524")
    private String zonecode;

    @NotBlank
    @Schema(description = "주소", example = "서울 중구 세종대로 110")
    private String address1;

    @NotBlank
    @Schema(description = "상세주소", example = "(태평로1가, 서울특별시청)")
    private String address2;
}
