package org.project.tripus.service;

import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.input.LoginInputDto;
import org.project.tripus.dto.output.LoginOutputDto;
import org.project.tripus.global.exception.CustomException;
import org.project.tripus.global.exception.ErrorEnum;
import org.project.tripus.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class AuthServiceImpl implements AuthService {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public LoginOutputDto login(LoginInputDto input) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(input.getUsername());

        if(!passwordEncoder.matches(input.getPassword(), userDetails.getPassword())) {
            throw new CustomException(ErrorEnum.USER_NOT_FOUND);
        }

        return LoginOutputDto.builder()
            .token(jwtUtil.generateToken(userDetails.getUsername()))
            .build();
    }
}
