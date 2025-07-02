package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.controller.response.GetLikedPlaceListResponseDto;
import org.project.tripus.dto.service.output.GetLikedPlaceListOutputDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.global.security.CustomUserDetails;
import org.project.tripus.mapper.PlaceMapper;
import org.project.tripus.service.PlaceService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "장소 API", description = "장소, 장소 좋아요")
@RequestMapping("/place")
@RestController
public class PlaceController {

    private final PlaceService placeService;
    private final PlaceMapper placeMapper;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "좋아요 누른 장소 목록 조회 성공"),
        @ApiResponse(responseCode = "401", description = "토큰 인증 실패"),
    })
    @Operation(summary = "좋아요 누른 장소 목록 조회", description = "현재 로그인한 회원이 특정 도시에서 좋아요 누른 장소의 목록을 조회합니다.")
    @SecurityRequirement(name = "JWT")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/liked")
    public ResponseEntity<?> getLikedPlaceList(
        @RequestParam @NotNull Long cityId,
        @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        GetLikedPlaceListOutputDto output = placeService.getLikedPlaceList(cityId, customUserDetails.getUserEntity());
        GetLikedPlaceListResponseDto response = placeMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.OK)
            .body(CommonResponse.success("좋아요 누른 장소 목록 조회 성공", response));
    }
}
