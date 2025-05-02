package org.project.tripus.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginRequestDto {

    @NotBlank
    @Schema(description = "아이디", example = "johndoe")
    private String username;

    @NotBlank
    @Schema(description = "비밀번호", example = "password1!")
    private String password;
}
