package org.project.tripus.dto.service.input;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdateTripInputDto {

    private List<List<SaveTripPlaceItemInputDto>> itinerary;
}
