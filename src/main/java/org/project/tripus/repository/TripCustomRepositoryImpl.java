package org.project.tripus.repository;

import static org.project.tripus.entity.QCityEntity.cityEntity;
import static org.project.tripus.entity.QTripEntity.tripEntity;
import static org.project.tripus.entity.QTripLikeEntity.tripLikeEntity;
import static org.project.tripus.entity.QUserEntity.userEntity;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.repository.output.GetTripListRepositoryOutputDto;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorCode;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TripCustomRepositoryImpl implements TripCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<GetTripListRepositoryOutputDto> findAllOrderBy(String sort) {
        OrderSpecifier<?> orderSpecifier = createOrderSpecifiers(sort);

        return jpaQueryFactory
            .select(Projections.fields(GetTripListRepositoryOutputDto.class,
                tripEntity.id.as("tripId"),
                tripEntity.title,
                tripEntity.startDate,
                tripEntity.endDate,
                tripLikeEntity.count().as("likes"),
                cityEntity.id.as("cityId"),
                cityEntity.name.as("cityName"),
                cityEntity.fileName,
                userEntity.id.as("userId"),
                userEntity.username
            ))
            .from(tripEntity)
            .leftJoin(tripLikeEntity).on(tripLikeEntity.trip.eq(tripEntity))
            .join(tripEntity.city, cityEntity)
            .join(tripEntity.user, userEntity)
            .groupBy(tripEntity.id)
            .orderBy(orderSpecifier)
            .fetch();
    }

    private OrderSpecifier<?> createOrderSpecifiers(String sort) {
        if("latest".equals(sort)) {
            return new OrderSpecifier<>(Order.DESC, tripEntity.createdAt);
        } else if("likes".equals(sort)) {
            return new OrderSpecifier<>(Order.DESC, tripLikeEntity.count());
        } else {
            throw new CustomException(ErrorCode.INVALID_FORMAT);
        }
    }
}
