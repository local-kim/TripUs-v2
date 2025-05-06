package org.project.tripus.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateTripRequestDto {

    @Valid
    private TripItem trip;

    @Valid
    @Schema(example = """
          [
            [
              {
                "contentid": "2350092",
                "contenttypeid": "12",
                "title": "더베이101",
                "cat3": "A02050600",
                "addr1": "부산광역시 해운대구 동백로 52",
                "addr2": "",
                "firstimage": "http://tong.visitkorea.or.kr/cms/resource/41/3407941_image2_1.png",
                "mapx": "129.1520975710",
                "mapy": "35.1566216976"
              }
            ],
            [
              {
                "contentid": "2778476",
                "contenttypeid": "39",
                "title": "동래밀면",
                "cat3": "A05020100",
                "addr1": "부산광역시 동래구 명륜로 47",
                "addr2": "(수안동)",
                "firstimage": "http://tong.visitkorea.or.kr/cms/resource/68/2778668_image2_1.jpg",
                "mapx": "129.0841912192",
                "mapy": "35.1984213145"
              },
              {
                "contentid": "142853",
                "contenttypeid": "32",
                "title": "파라다이스 호텔 부산",
                "cat3": "B02010100",
                "addr1": "부산광역시 해운대구 해운대해변로 296",
                "addr2": "",
                "firstimage": "http://tong.visitkorea.or.kr/cms/resource/64/2945264_image2_1.jpg",
                "mapx": "129.1641214339",
                "mapy": "35.1599409935"
              }
            ],
            [
              {
                "contentid": "1018702",
                "contenttypeid": "12",
                "title": "국제시장 먹자골목",
                "cat3": "A02030400",
                "addr1": "부산광역시 중구 중구로 36",
                "addr2": "",
                "firstimage": "http://tong.visitkorea.or.kr/cms/resource/30/3476830_image2_1.jpg",
                "mapx": "129.0280793175",
                "mapy": "35.1011311741"
              },
              {
                "contentid": "3027700",
                "contenttypeid": "12",
                "title": "청사포 기찻길",
                "cat3": "A02030400",
                "addr1": "부산광역시 해운대구 달맞이길62번길 13 (중동)",
                "addr2": "",
                "firstimage": "http://tong.visitkorea.or.kr/cms/resource/53/3027653_image2_1.JPG",
                "mapx": "129.1728512790",
                "mapy": "35.1581969059"
              },
              {
                "contentid": "128164",
                "contenttypeid": "12",
                "title": "부산광안대교",
                "cat3": "A02050100",
                "addr1": "부산광역시 해운대구 수영강변대로 203",
                "addr2": "",
                "firstimage": "http://tong.visitkorea.or.kr/cms/resource/77/3368477_image2_1.jpg",
                "mapx": "129.1270084045",
                "mapy": "35.1449947568"
              }
            ]
          ]
        """)
    private List<List<PlaceItem>> itinerary;

    @Getter
    @Setter
    @Builder
    public static class TripItem {

        @NotNull
        @Schema(description = "도시 ID", example = "159")
        private Long cityId;

        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        @Schema(description = "시작날짜", example = "2025-05-01")
        private LocalDate startDate;

        @NotNull
        @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
        @Schema(description = "종료날짜", example = "2025-05-03")
        private LocalDate endDate;
    }

    @Getter
    @Setter
    @Builder
    public static class PlaceItem {

        @NotNull
        @Schema(description = "콘텐츠 ID")
        private String contentid;

        @NotNull
        @Schema(description = "콘텐츠타입 ID")
        private String contenttypeid;

        @NotNull
        @Schema(description = "장소명")
        private String title;

        @Schema(description = "소분류")
        private String cat3;

        @Schema(description = "주소")
        private String addr1;

        @Schema(description = "상세주소")
        private String addr2;

        @Schema(description = "대표이미지")
        private String firstimage;

        @Schema(description = "GPS X좌표")
        private String mapx;

        @Schema(description = "GPS Y좌표")
        private String mapy;
    }
}
