package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.PlaceDto;
import org.project.tripus.service.PlaceService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "장소 API", description = "장소와 장소 좋아요에 관한 API")
@RequestMapping("/place")
@RestController
public class PlaceController {

    private final PlaceService placeService;

    @GetMapping("/my-place-list")
    public List<PlaceDto> getMyPlaceList(
        @RequestParam int cityNum,
        @RequestParam int loginNum
    ) {
        return placeService.getMyPlaceList(cityNum, loginNum);
    }
}
