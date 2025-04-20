package org.project.tripus.global.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommonResponse<T> {

    // 상태(성공/실패)
    private Status status;

    // 메세지
    private String message;

    // 성공 - 데이터
    private T data;

    // 실패 - 에러 정보
    private ErrorResponse error;

    public static <T> CommonResponse<T> success(String message, T data) {
        return CommonResponse.<T>builder()
            .status(Status.SUCCESS)
            .message(message)
            .data(data)
            .build();
    }

    public static <T> CommonResponse<T> success(String message) {
        return success(message, null);
    }

    public static <T> CommonResponse<T> success(T data) {
        return success(null, data);
    }

    public static <T> CommonResponse<T> fail(String message, ErrorResponse error) {
        return CommonResponse.<T>builder()
            .status(Status.FAIL)
            .message(message)
            .error(error)
            .build();
    }

    public static <T> CommonResponse<T> fail(ErrorResponse error) {
        return fail(null, error);
    }

    private enum Status {
        SUCCESS, FAIL
    }
}
