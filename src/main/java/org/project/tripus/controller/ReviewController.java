package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.project.tripus.dto.controller.request.CreateReviewRequestDto;
import org.project.tripus.dto.controller.response.CreateReviewResponseDto;
import org.project.tripus.dto.service.input.CreateReviewInputDto;
import org.project.tripus.dto.service.output.CreateReviewOutputDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.global.security.CustomUserDetails;
import org.project.tripus.mapper.ReviewMapper;
import org.project.tripus.service.ReviewService;
import org.project.tripus.service.file.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Tag(name = "후기 API", description = "후기")
@RequestMapping("/review")
@RestController
public class ReviewController {

    private final FileService fileService;
    private final ReviewMapper reviewMapper;
    private final ReviewService reviewService;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "후기 생성 성공"),
        @ApiResponse(responseCode = "400", description = "1. 잘못된 입력 형식 2. 파일 업로드 실패"),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 장소"),
    })
    @Operation(summary = "후기 생성")
    @SecurityRequirement(name = "JWT")
    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createReview(
        @RequestPart("data") @Valid CreateReviewRequestDto request,
        @RequestPart("file") @Nullable List<MultipartFile> images,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        // 후기 이미지 업로드
        List<String> imageUrls = null;
        if(images != null && !images.isEmpty()) {
            imageUrls = fileService.uploadReviewImage(images);
        }

        // 후기 저장
        CreateReviewInputDto input = reviewMapper.toInput(request);
        CreateReviewOutputDto output = reviewService.createReview(input, imageUrls, customUserDetails.getUserEntity());
        CreateReviewResponseDto response = reviewMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(CommonResponse.success("후기 생성 성공", response));
    }
}
