package org.project.tripus.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.output.GetLikedPlaceListOutputDto;
import org.project.tripus.dto.output.GetLikedPlaceListOutputDto.PlaceItem;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;

    /**
     * 콘텐츠 ID로 장소를 조회합니다.
     *
     * @param contentid 장소의 콘텐츠 ID
     * @return 장소 엔티티를 포함하는 Optional. 조회 결과가 없는 경우 빈 Optional
     */
    public Optional<PlaceEntity> findPlaceByContentid(String contentid) {
        return placeRepository.findTop1ByContentid(contentid);
    }

    /**
     * 장소 엔티티를 저장합니다.
     *
     * @param placeEntity 장소 엔티티
     */
    @Transactional
    public void createPlaceEntity(PlaceEntity placeEntity) {
        placeRepository.save(placeEntity);
    }

    /**
     * 현재 로그인한 회원이 특정 도시에서 좋아요 누른 장소의 리스트를 조회합니다.
     *
     * @param cityId     조회할 도시 ID
     * @param userEntity 현재 로그인한 회원 엔티티
     * @return 좋아요 누른 장소 정보가 담긴 DTO
     */
    public GetLikedPlaceListOutputDto getLikedPlaceList(Long cityId, UserEntity userEntity) {
        List<PlaceEntity> placeEntityList = getLikedPlaceEntityList(cityId, userEntity);

        List<PlaceItem> placeList = placeEntityList.stream().map(placeEntity -> PlaceItem.builder()
            .contentid(placeEntity.getContentid())
            .contenttypeid(placeEntity.getContenttypeid())
            .title(placeEntity.getTitle())
            .cat3(placeEntity.getCat3())
            .addr1(placeEntity.getAddr1())
            .addr2(placeEntity.getAddr2())
            .firstimage(placeEntity.getFirstimage())
            .mapx(placeEntity.getMapx())
            .mapy(placeEntity.getMapy())
            .build()
        ).toList();

        return GetLikedPlaceListOutputDto.builder()
            .place(placeList)
            .build();
    }

    /**
     * 도시 ID와 회원 엔티티로 좋아요 누른 장소 엔티티의 리스트를 조회합니다.
     *
     * @param cityId     조회할 도시 ID
     * @param userEntity 현재 로그인한 회원 엔티티
     * @return 좋아요 누른 장소 리스트. 조회 결과가 없는 경우 빈 리스트
     */
    public List<PlaceEntity> getLikedPlaceEntityList(Long cityId, UserEntity userEntity) {
        return placeRepository.findLikedPlaceByCityIdAndUser(cityId, userEntity);
    }
}
