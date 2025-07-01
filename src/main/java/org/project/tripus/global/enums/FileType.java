package org.project.tripus.global.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FileType {

    REVIEW_IMAGE("review/"),
    ;

    private final String folder;
}
