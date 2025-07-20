package org.project.tripus.global.annotation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.project.tripus.global.validator.NestedListValidator;

@Documented
@Constraint(validatedBy = NestedListValidator.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidNestedList {

    String message() default "contentid, contenttypeid, title은 필수입니다.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
