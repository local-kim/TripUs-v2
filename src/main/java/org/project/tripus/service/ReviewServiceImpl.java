package org.project.tripus.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.service.input.CreateReviewInputDto;
import org.project.tripus.dto.service.output.CreateReviewOutputDto;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.ReviewEntity;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.event.model.DeleteFileEvent;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.repository.PlaceRepository;
import org.project.tripus.repository.ReviewRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ReviewServiceImpl implements ReviewService {

    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * 후기를 저장합니다. 트랜잭션이 실패하면 저장한 파일을 비동기적으로 삭제하는 이벤트를 발행합니다.
     *
     * @param input      후기 정보가 담긴 DTO
     * @param imageUrls  저장한 파일의 URL 리스트
     * @param userEntity 현재 인증한 사용자 엔티티
     * @return 후기 ID가 담긴 DTO
     */
    @Transactional
    public CreateReviewOutputDto createReview(CreateReviewInputDto input, List<String> imageUrls, UserEntity userEntity) {
        // 트랜잭션 롤백 시 저장된 파일을 비동기적으로 삭제하는 이벤트 발행
        if(!imageUrls.isEmpty()) {
            eventPublisher.publishEvent(new DeleteFileEvent(imageUrls));
        }

        // 장소 엔티티 조회
        PlaceEntity placeEntity = placeRepository.findById(input.getPlaceId())
            .orElseThrow(() -> new CustomException(ErrorCode.PLACE_NOT_FOUND));

        // 후기 엔티티 생성 및 저장
        ReviewEntity reviewEntity = input.toEntity(placeEntity, userEntity);
        reviewRepository.save(reviewEntity);

        // 후기 ID 반환
        return CreateReviewOutputDto.builder()
            .reviewId(reviewEntity.getId())
            .build();
    }
}
