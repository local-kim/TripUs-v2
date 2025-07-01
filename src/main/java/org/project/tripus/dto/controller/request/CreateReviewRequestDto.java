package org.project.tripus.dto.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateReviewRequestDto {

    @NotNull
    @Schema(description = "장소 ID", example = "1")
    private Long placeId;

    @NotNull
    @Schema(description = "별점", example = "4.5")
    private Double stars;

    @NotBlank
    @Schema(description = "내용", example = "아주 멋진 곳")
    private String content;
}
