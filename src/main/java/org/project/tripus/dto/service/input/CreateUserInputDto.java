package org.project.tripus.dto.service.input;

import java.time.LocalDate;
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

    private String name;

    private String email;

    private String tel;

    private LocalDate birthday;

    private String zonecode;

    private String address1;

    private String address2;

    public UserEntity toUserEntity(PasswordEncoder passwordEncoder) {
        return UserEntity.builder()
            .username(username)
            .password(passwordEncoder.encode(password))
            .name(name)
            .email(email)
            .tel(tel)
            .birthday(birthday)
            .zonecode(zonecode)
            .address1(address1)
            .address2(address2)
            .build();
    }
}
