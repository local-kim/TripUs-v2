package org.project.tripus.util;

import java.util.Optional;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.global.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtil {

    /**
     * 현재 인증된 회원의 정보를 Optional로 반환합니다.
     *
     * @return 현재 인증된 회원의 MemberEntity를 포함하는 Optional,
     * 인증된 회원이 없거나 유효하지 않은 경우 빈 Optional
     */
    public Optional<UserEntity> getCurrentMember() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication != null && authentication.getPrincipal() instanceof CustomUserDetails userDetails) {
            return Optional.of(userDetails.getUserEntity());
        }

        return Optional.empty();
    }
}
