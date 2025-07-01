package org.project.tripus.global.exception;

import jakarta.servlet.http.HttpServletResponse;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.global.response.ErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    // 커스텀 예외
    @ExceptionHandler(value = CustomException.class)
    public ResponseEntity<CommonResponse<ErrorResponse>> handleCustomException(CustomException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(e.getErrorCode().name())
            .message(List.of(e.getErrorCode().getMessage()))
            .build();

        log.warn("[{}] {}", e.getErrorCode().name(), e.getErrorCode().getMessage());

        return ResponseEntity.status(e.getErrorCode().getHttpStatus())
            .body(CommonResponse.fail(e.getMessage(), errorResponse));
    }

    // Validation 예외
    @Override
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
        HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> messages = ex.getBindingResult().getFieldErrors().stream()
            .map(e -> e.getDefaultMessage() + " : " + e.getField())
            .toList();

        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(ErrorCode.INVALID_FORMAT.name())
            .message(messages)
            .build();

        for(String message : messages) {
            log.warn("[{}] {}", ErrorCode.INVALID_FORMAT.name(), message);
        }

        return ResponseEntity.status(ErrorCode.INVALID_FORMAT.getHttpStatus())
            .body(CommonResponse.fail(errorResponse));
    }

    // ResponseEntityExceptionHandler에서 잡는 예외
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, @Nullable Object body,
        HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        if(request instanceof ServletWebRequest servletWebRequest) {
            HttpServletResponse response = servletWebRequest.getResponse();
            if(response != null && response.isCommitted()) {
                if(this.logger.isWarnEnabled()) {
                    this.logger.warn("Response already committed. Ignoring: " + ex);
                }

                return null;
            }
        }

        if(body == null && ex instanceof org.springframework.web.ErrorResponse errorResponse) {
            ErrorResponse error = ErrorResponse.builder()
                .code(statusCode.toString().split(" ")[1])
                .message(List.of(String.valueOf(errorResponse.getBody().getDetail())))
                .build();

            body = CommonResponse.fail(error);

            log.warn("[{}] {}", statusCode.toString().split(" ")[1],
                errorResponse.getBody().getDetail());
            log.warn(ex.getMessage(), ex);
        }

        if(statusCode.equals(HttpStatus.INTERNAL_SERVER_ERROR) && body == null) {
            request.setAttribute("jakarta.servlet.error.exception", ex, 0);
        }

        return this.createResponseEntity(body, headers, statusCode, request);
    }

    // Spring Security Filter 예외
    @ExceptionHandler(value = AuthorizationDeniedException.class)
    public ResponseEntity<CommonResponse<ErrorResponse>> handleAuthorizationDeniedException(
        AuthorizationDeniedException e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(ErrorCode.AUTHENTICATION_FAILED.name())
            .message(List.of(ErrorCode.AUTHENTICATION_FAILED.getMessage()))
            .build();

        log.warn("[{}] {}", ErrorCode.AUTHENTICATION_FAILED.name(),
            ErrorCode.AUTHENTICATION_FAILED.getMessage());

        return ResponseEntity.status(ErrorCode.AUTHENTICATION_FAILED.getHttpStatus())
            .body(CommonResponse.fail(errorResponse));
    }

    // 그 밖의 예외
    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<CommonResponse<ErrorResponse>> handleException(Exception e) {
        ErrorResponse errorResponse = ErrorResponse.builder()
            .code(ErrorCode.INTERNAL_SERVER_ERROR.name())
            .message(List.of(ErrorCode.INTERNAL_SERVER_ERROR.getMessage()))
            .build();

        log.error("[{}] {}", ErrorCode.INTERNAL_SERVER_ERROR.name(),
            ErrorCode.INTERNAL_SERVER_ERROR.getMessage(), e);

        return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus())
            .body(CommonResponse.fail(errorResponse));
    }
}
