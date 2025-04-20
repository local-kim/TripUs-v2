package org.project.tripus.global.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorResponse {

    // 에러 코드
    private String code;

    // 에러 메세지
    private List<String> message;
}