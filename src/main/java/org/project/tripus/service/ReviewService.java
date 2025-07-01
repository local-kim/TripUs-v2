package org.project.tripus.service;

import java.util.List;
import org.project.tripus.dto.service.input.CreateReviewInputDto;
import org.project.tripus.dto.service.output.CreateReviewOutputDto;
import org.project.tripus.entity.UserEntity;

public interface ReviewService {

    CreateReviewOutputDto createReview(CreateReviewInputDto input, List<String> imageUrls, UserEntity userEntity);
}
