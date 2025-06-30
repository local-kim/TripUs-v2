package org.project.tripus;

import java.time.LocalDate;
import org.project.tripus.entity.UserEntity;

public class UserFixture {

    public static UserEntity generate(String encodedPassword) {
        return UserEntity.builder()
            .username("test-user")
            .password(encodedPassword)
            .name("test")
            .type(1)
            .email("test@example.com")
            .tel("010-1234-5678")
            .birthday(LocalDate.of(1999, 1, 1))
            .zonecode("12345")
            .address1("서울시")
            .address2("101동 202호")
            .profileFileUrl(null)
            .build();
    }
}
