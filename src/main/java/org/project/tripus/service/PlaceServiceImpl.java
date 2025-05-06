package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.entity.PlaceEntity;
import org.project.tripus.mybatismapper.PlanMapper;
import org.project.tripus.repository.PlaceRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PlaceServiceImpl implements PlaceService {

    private final PlanMapper planMapper;
    private final PlaceRepository placeRepository;

    /**
     * 콘텐츠 ID로 장소를 조회하는 메서드
     *
     * @param contentid 장소의 콘텐츠 ID
     * @return 장소 엔티티를 포함하는 Optional, 없으면 빈 Optional
     */
    public Optional<PlaceEntity> findPlaceByContentid(String contentid) {
        return placeRepository.findTop1ByContentid(contentid);
    }

    /**
     * 장소 엔티티를 저장하는 메서드
     *
     * @param placeEntity 장소 엔티티
     */
    @Transactional
    public void createPlaceEntity(PlaceEntity placeEntity) {
        placeRepository.save(placeEntity);
    }

    public List<PlaceDto> getMyPlaceList(int cityNum, int memberNum) {
        Map<String, Integer> map = new HashMap<>();
        map.put("city_num", cityNum);
        map.put("member_num", memberNum);

        return planMapper.getMyPlaceList(map);
    }
}
