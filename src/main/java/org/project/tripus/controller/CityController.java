package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.controller.response.GetCityListResponseDto;
import org.project.tripus.dto.controller.response.GetCityResponseDto;
import org.project.tripus.dto.service.output.GetCityListOutputDto;
import org.project.tripus.dto.service.output.GetCityOutputDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.mapper.CityMapper;
import org.project.tripus.service.CityService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "도시 API", description = "도시에 관한 API")
@RequestMapping("/city")
@RestController
public class CityController {

    private final CityService cityService;
    private final CityMapper cityMapper;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "도시 목록 조회 성공")
    })
    @Operation(summary = "도시 목록 조회")
    @GetMapping("")
    public ResponseEntity<?> getCityList() {
        GetCityListOutputDto output = cityService.getCityList();
        GetCityListResponseDto response = cityMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.OK)
            .body(CommonResponse.success("도시 목록 조회 성공", response));
    }

    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "도시 조회 성공"),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 도시")
    })
    @Operation(summary = "도시 조회")
    @GetMapping("/{id}")
    public ResponseEntity<?> getCity(@PathVariable Long id) {
        GetCityOutputDto output = cityService.getCity(id);
        GetCityResponseDto response = cityMapper.toResponse(output);

        return ResponseEntity.status(HttpStatus.OK)
            .body(CommonResponse.success("도시 조회 성공", response));
    }
}
