package org.project.tripus.dto.service.output;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReissueOutputDto {

    private String accessToken;

    private String refreshToken;
}
