package org.project.tripus.dto.service.input;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class LoginInputDto {

    private String username;

    private String password;
}
