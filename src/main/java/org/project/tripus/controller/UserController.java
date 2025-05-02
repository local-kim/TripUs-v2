package org.project.tripus.controller;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.MemberSecurityDto;
import org.project.tripus.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/insert")
    public void insert(@RequestBody MemberDto dto) {
        memberService.insertMember(dto);
    }

    @GetMapping("/idcheck")
    public int idcheck(@RequestParam String id) {
        return memberService.idcheck(id);
    }

    @GetMapping("/emailcheck")
    public int emailcheck(@RequestParam String email) {
        return memberService.emailcheck(email);
    }

    @GetMapping("/getname")
    public String getname(@RequestParam String id) {
        return memberService.getName(id);
    }

    @DeleteMapping("delete")
    public void deleteMember(@RequestParam int num) {
        memberService.deleteMember(num);
    }

    // 로그인 처리
    @PostMapping("/process")
    public boolean process(
        @RequestParam String id,
        @RequestParam String password,
        @RequestParam(required = false) String saveId,
        HttpSession session) {
//			password = Util.encode(password);

        if(memberService.login(id, password)) {
            System.out.println("로그인 성공");
            List<Map<String, Object>> map = memberService.getLoginInfo(id);

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
        memberService.checkKakaoMember(dto);
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
        memberService.join(member, "ROLE_USER");    // 일반회원 가입시 ROLE_USER로 권한 설정
        return ResponseEntity.ok("Sign up success");
    }

    @PostMapping("/kakaojoin")
    public ResponseEntity<String> kakaoJoin(@RequestBody MemberSecurityDto member) {
        memberService.kakaoJoin(member, "ROLE_USER");    // 일반회원 가입시 ROLE_USER로 권한 설정
        return ResponseEntity.ok("Sign up success");
    }

    @PostMapping("/findPw")
    public ResponseEntity<String> findPassword(@RequestBody HashMap<String, Object> request) {
        if(memberService.checkId((String) request.get("id")) == 0) {
            return new ResponseEntity<>("회원정보를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
        }

        if(memberService.checkEmail((String) request.get("email")) == 0) {
            return new ResponseEntity<>("이메일 주소를 다시 확인해주세요.", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/changePw")
    public ResponseEntity<String> changePassword(@RequestBody HashMap<String, Object> request) {
        System.out.println(request);

        memberService.changePassword((String) request.get("id"), (String) request.get("password"));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
