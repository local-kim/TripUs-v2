package org.project.tripus.dto.controller.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SaveTripPlaceItemRequestDto {

    @NotBlank
    @Schema(description = "콘텐츠 ID")
    private String contentid;

    @NotBlank
    @Schema(description = "콘텐츠타입 ID")
    private String contenttypeid;

    @NotBlank
    @Schema(description = "장소명")
    private String title;

    @Schema(description = "소분류")
    private String cat3;

    @Schema(description = "주소")
    private String addr1;

    @Schema(description = "상세주소")
    private String addr2;

    @Schema(description = "대표이미지")
    private String firstimage;

    @Schema(description = "GPS X좌표")
    private String mapx;

    @Schema(description = "GPS Y좌표")
    private String mapy;
}
