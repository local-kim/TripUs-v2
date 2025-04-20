package org.project.tripus.controller;

import java.util.HashMap;
import org.project.tripus.dto.LoginDto;
import org.project.tripus.dto.MemberSecurityDto;
import org.project.tripus.service.MemberService;
import org.project.tripus.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", exposedHeaders = "**")
public class AuthController {

    @Autowired
    private MemberService service;

    private final JwtUtil jwtUtil;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    public AuthController(JwtUtil jwtUtil,
        AuthenticationManagerBuilder authenticationManagerBuilder) {
        this.jwtUtil = jwtUtil;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
    }

    // 로그인시 권한 검증
    @PostMapping("/login")
    public ResponseEntity<MemberSecurityDto> login(@RequestBody LoginDto loginDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
            new UsernamePasswordAuthenticationToken(loginDto.getId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject()
            .authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtil.generateToken(String.valueOf(authentication));

        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

//        MemberSecurityDto member = (MemberSecurityDto)service.loadUserByUsername(loginDto.getId());
        MemberSecurityDto member = service.getLoginInfo2(loginDto.getId());    // 프로필 사진도 같이 받아옴
        member.setToken(jwt);

//        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
        return new ResponseEntity<>(member, httpHeaders, HttpStatus.OK);
    }

    @PostMapping("/kakaologin")
    public MemberSecurityDto kakaoLogin(@RequestBody LoginDto loginDto) {
        MemberSecurityDto member = service.getLoginInfo2(loginDto.getId());    // 프로필 사진도 같이 받아옴
//        System.out.println(member);

        return member;
    }

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberSecurityDto member) {
        service.join(member, "ROLE_USER");    // 일반회원 가입시 ROLE_USER로 권한 설정
        return ResponseEntity.ok("Sign up success");
    }

    @PostMapping("/kakaojoin")
    public ResponseEntity<String> kakaoJoin(@RequestBody MemberSecurityDto member) {
        service.kakaoJoin(member, "ROLE_USER");    // 일반회원 가입시 ROLE_USER로 권한 설정
        return ResponseEntity.ok("Sign up success");
    }

    @PostMapping("/findPw")
    public ResponseEntity<String> findPassword(@RequestBody HashMap<String, Object> request) {
        if(service.checkId((String) request.get("id")) == 0) {
            return new ResponseEntity<>("회원정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        if(service.checkEmail((String) request.get("email")) == 0) {
            return new ResponseEntity<>("이메일 주소를 다시 확인해주세요.", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/changePw")
    public ResponseEntity<String> changePassword(@RequestBody HashMap<String, Object> request) {
        System.out.println(request);

        service.changePassword((String) request.get("id"), (String) request.get("password"));

        return new ResponseEntity<>(HttpStatus.OK);
    }

}