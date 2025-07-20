package org.project.tripus.global.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import java.util.List;
import java.util.Set;
import org.project.tripus.global.annotation.ValidNestedList;

public class NestedListValidator implements ConstraintValidator<ValidNestedList, Object> {

    private Validator validator;

    @Override
    public void initialize(ValidNestedList constraintAnnotation) {
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if(value == null) {
            return true;
        }

        if(!(value instanceof List<?> outer)) {
            return false;
        }

        for(Object inner : outer) {
            if(!(inner instanceof List<?>)) {
                return false;
            }

            for(Object element : (List<?>) inner) {
                Set<ConstraintViolation<Object>> violations = validator.validate(element);

                if(!violations.isEmpty()) {
                    context.disableDefaultConstraintViolation();

                    for(ConstraintViolation<Object> violation : violations) {
                        context.buildConstraintViolationWithTemplate(
                            violation.getPropertyPath() + ": " + violation.getMessage()
                        ).addConstraintViolation();
                    }

                    return false;
                }
            }
        }

        return true;
    }
}