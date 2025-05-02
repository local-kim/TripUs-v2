package org.project.tripus.dto.input;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.project.tripus.entity.UserEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@Builder
public class CreateUserInputDto {

    private String username;

    private String password;

    public UserEntity toUserEntity(PasswordEncoder passwordEncoder) {
        return UserEntity.builder()
            .username(username)
            .password(passwordEncoder.encode(password))
            .build();
    }
}
