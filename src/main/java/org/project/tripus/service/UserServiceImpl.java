package org.project.tripus.service;

import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.service.input.CreateUserInputDto;
import org.project.tripus.entity.UserEntity;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * 회원을 생성합니다.
     *
     * @param input 회원 정보가 담긴 DTO
     * @throws CustomException 이미 가입된 아이디인 경우 {@code USERNAME_ALREADY_EXISTS} 예외를 발생시킵니다.
     */
    @Transactional
    public void createMember(CreateUserInputDto input) {
        // 아이디 중복 체크
        if(userRepository.findByUsername(input.getUsername()).isPresent()) {
            throw new CustomException(ErrorCode.USERNAME_ALREADY_EXISTS);
        }

        UserEntity userEntity = input.toUserEntity(passwordEncoder);

        userRepository.save(userEntity);
    }
}
