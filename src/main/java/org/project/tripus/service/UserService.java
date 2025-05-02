package org.project.tripus.service;

import java.util.List;
import java.util.Map;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.MemberSecurityDto;
import org.project.tripus.dto.input.CreateUserInputDto;

public interface UserService {

	void createMember(CreateUserInputDto input);

	String getName(String id);

	//	int loginCheck(String id,String pass);
	void deleteMember(int num);

	int idcheck(String id);

	int emailcheck(String email);

	boolean login(String id, String password);

	List<Map<String, Object>> getLoginInfo(String id);

	int checkKakaoMember(MemberDto dto);

	///
	void join(MemberSecurityDto member, String role);

	void kakaoJoin(MemberSecurityDto member, String role);

	int checkId(String id);

	int checkEmail(String email);

	void changePassword(String id, String password);

	MemberSecurityDto getLoginInfo2(String id);
}