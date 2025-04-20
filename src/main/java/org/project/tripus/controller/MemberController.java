//package org.project.tripus.controller;
//
//import jakarta.servlet.http.HttpSession;
//import java.util.List;
//import java.util.Map;
//import org.project.tripus.dto.MemberDto;
//import org.project.tripus.service.MemberService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@CrossOrigin
//@RequestMapping("/member")
//public class MemberController {
//
//	@Autowired
//	private MemberService memberService;
//
//	@PostMapping("/insert")
//	public void insert(@RequestBody MemberDto dto
////			@RequestParam String year,
////			@RequestParam String month,
////			@RequestParam String day
////			@RequestParam String address1,
////			@RequestParam String address2,
////			@RequestParam String zonecode
//
//			) {
////		System.out.println(dto);
////		System.out.println(year+',' +month+','+ day);
////		String birthday = year+month+day;
////		dto.setBirthday(birthday);
////		System.out.println(birthday);
//		memberService.insertMember(dto);
//	}
//
//	@GetMapping("/idcheck")
//	public int idcheck(@RequestParam String id) {
//		return memberService.idcheck(id);
//	}
//
//	@GetMapping("/emailcheck")
//	public int emailcheck(@RequestParam String email) {
//		return memberService.emailcheck(email);
//	}
//
////	@PostMapping("/login")
////	public int login(@RequestBody MemberDto dto) {
////		return memberService.loginCheck(dto.getId(), dto.getPassword());
////	}
//
//	@GetMapping("/getname")
//	public String getname(@RequestParam String id) {
//		return memberService.getName(id);
//	}
//
//	@DeleteMapping("delete")
//	public void deleteMember(@RequestParam int num) {
//		memberService.deleteMember(num);
//	}
//
//	// 로그인 처리
//	@PostMapping("/process")
//	public boolean process(
//		@RequestParam String id,
//		@RequestParam String password,
//		@RequestParam(required = false) String saveId,
//		HttpSession session) {
////			password = Util.encode(password);
//
//		if(memberService.login(id, password)) {
//			System.out.println("로그인 성공");
//			List<Map<String, Object>> map = memberService.getLoginInfo(id);
//
//			session.setMaxInactiveInterval(60 * 60 * 24);	// 24h
//			session.setAttribute("loggedIn", true);
//			session.setAttribute("loginId", id);
//			session.setAttribute("loginNum", map.get(0).get("num"));
//			session.setAttribute("loginName", map.get(0).get("name"));
//			session.setAttribute("loginAdmin", map.get(0).get("type"));
//			session.setAttribute("saveId", (saveId == null ? "false" : "true"));
//
//			return true;
//		}
//		else {
//			System.out.println("로그인 실패");
//			return false;
//		}
//	}
//
//	@PostMapping("/insertKakao")
//	public void insertKaKao(@RequestBody MemberDto dto) {
//		memberService.checkKakaoMember(dto);
//	}
//
//	@GetMapping("/logout")
//	public void logout(
//			HttpSession session
//			) {
//		session.removeAttribute("loggedIn");
//		session.invalidate();
//	}
//
//}
