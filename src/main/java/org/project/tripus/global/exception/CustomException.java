package org.project.tripus.global.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {

    private final ErrorEnum errorEnum;

    public CustomException(ErrorEnum errorEnum, String errorMessage) {
        super(errorMessage);
        this.errorEnum = errorEnum;
    }

    public CustomException(ErrorEnum errorEnum) {
        this.errorEnum = errorEnum;
    }
}
