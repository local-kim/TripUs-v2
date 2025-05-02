package org.project.tripus.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.MemberSecurityDto;
import org.project.tripus.dto.input.CreateUserInputDto;
import org.project.tripus.dto.request.CreateUserRequestDto;
import org.project.tripus.global.response.CommonResponse;
import org.project.tripus.mapper.UserMapper;
import org.project.tripus.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Tag(name = "회원 API", description = "회원")
@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "회원가입 성공"),
        @ApiResponse(responseCode = "400", description = "1. 잘못된 입력 형식 2. 이미 가입된 아이디"),
    })
    @Operation(summary = "회원가입", description = "비밀번호: 8~16자의 영문, 숫자, 특수문자를 1개 이상 포함한 문자열")
    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequestDto request) {
        CreateUserInputDto input = userMapper.toInput(request);

        userService.createMember(input);

        return ResponseEntity.status(HttpStatus.CREATED)
            .body(CommonResponse.success("회원가입 성공"));
    }

    // 리팩토링 전

    @GetMapping("/idcheck")
    public int idcheck(@RequestParam String id) {
        return userService.idcheck(id);
    }

    @GetMapping("/emailcheck")
    public int emailcheck(@RequestParam String email) {
        return userService.emailcheck(email);
    }

    @GetMapping("/getname")
    public String getname(@RequestParam String id) {
        return userService.getName(id);
    }

    @DeleteMapping("delete")
    public void deleteMember(@RequestParam int num) {
        userService.deleteMember(num);
    }

    // 로그인 처리
    @PostMapping("/process")
    public boolean process(
        @RequestParam String id,
        @RequestParam String password,
        @RequestParam(required = false) String saveId,
        HttpSession session) {
//			password = Util.encode(password);

        if(userService.login(id, password)) {
            System.out.println("로그인 성공");
            List<Map<String, Object>> map = userService.getLoginInfo(id);

            session.setMaxInactiveInterval(60 * 60 * 24);    // 24h
            session.setAttribute("loggedIn", true);
            session.setAttribute("loginId", id);
            session.setAttribute("loginNum", map.get(0).get("num"));
            session.setAttribute("loginName", map.get(0).get("name"));
            session.setAttribute("loginAdmin", map.get(0).get("type"));
            session.setAttribute("saveId", (saveId == null ? "false" : "true"));

            return true;
        } else {
            System.out.println("로그인 실패");
            return false;
        }
    }

    @PostMapping("/insertKakao")
    public void insertKaKao(@RequestBody MemberDto dto) {
        userService.checkKakaoMember(dto);
    }

    @GetMapping("/logout")
    public void logout(
        HttpSession session
    ) {
        session.removeAttribute("loggedIn");
        session.invalidate();
    }

    // auth에 있던거
    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberSecurityDto member) {
        userService.join(member, "ROLE_USER");    // 일반회원 가입시 ROLE_USER로 권한 설정
        return ResponseEntity.ok("Sign up success");
    }

    @PostMapping("/kakaojoin")
    public ResponseEntity<String> kakaoJoin(@RequestBody MemberSecurityDto member) {
        userService.kakaoJoin(member, "ROLE_USER");    // 일반회원 가입시 ROLE_USER로 권한 설정
        return ResponseEntity.ok("Sign up success");
    }

    @PostMapping("/findPw")
    public ResponseEntity<String> findPassword(@RequestBody HashMap<String, Object> request) {
        if(userService.checkId((String) request.get("id")) == 0) {
            return new ResponseEntity<>("회원정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        if(userService.checkEmail((String) request.get("email")) == 0) {
            return new ResponseEntity<>("이메일 주소를 다시 확인해주세요.", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/changePw")
    public ResponseEntity<String> changePassword(@RequestBody HashMap<String, Object> request) {
        System.out.println(request);

        userService.changePassword((String) request.get("id"), (String) request.get("password"));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
