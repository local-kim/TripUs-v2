package org.project.tripus.global.annotation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import java.util.List;
import org.project.tripus.dto.controller.request.SaveTripPlaceItemRequestDto;

public class ItineraryValidator implements ConstraintValidator<ValidItinerary, List<List<SaveTripPlaceItemRequestDto>>> {

    @Override
    public boolean isValid(List<List<SaveTripPlaceItemRequestDto>> itinerary, ConstraintValidatorContext context) {
        for(List<SaveTripPlaceItemRequestDto> placeList : itinerary) {
            for(SaveTripPlaceItemRequestDto place : placeList) {
                if(place.getContentid().isBlank() || place.getContenttypeid().isBlank() || place.getTitle().isBlank()) {
                    return false;
                }
            }
        }

        return true;
    }

    @Override
    public void initialize(ValidItinerary constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }
}
