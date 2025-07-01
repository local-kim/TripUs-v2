package org.project.tripus.mapper;

import org.mapstruct.Mapper;
import org.project.tripus.dto.controller.request.CreateReviewRequestDto;
import org.project.tripus.dto.controller.response.CreateReviewResponseDto;
import org.project.tripus.dto.service.input.CreateReviewInputDto;
import org.project.tripus.dto.service.output.CreateReviewOutputDto;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    CreateReviewInputDto toInput(CreateReviewRequestDto request);

    CreateReviewResponseDto toResponse(CreateReviewOutputDto output);
}
