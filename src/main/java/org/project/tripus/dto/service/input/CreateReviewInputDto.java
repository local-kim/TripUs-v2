package org.project.tripus.dto.service.input;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.ReviewEntity;
import org.project.tripus.entity.UserEntity;

@Getter
@Setter
@Builder
public class CreateReviewInputDto {

    private Long placeId;

    private Double stars;

    private String content;

    public ReviewEntity toEntity(PlaceEntity placeEntity, UserEntity userEntity) {
        return ReviewEntity.builder()
            .place(placeEntity)
            .user(userEntity)
            .stars(stars)
            .content(content)
            .build();
    }
}
