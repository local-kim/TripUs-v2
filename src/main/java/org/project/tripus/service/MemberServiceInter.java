package org.project.tripus.service;

import java.util.List;
import java.util.Map;
import org.project.tripus.dto.MemberDto;

public interface MemberServiceInter {

	public void insertMember(MemberDto dto);
	public String getName(String id);
//	public int loginCheck(String id,String pass);
	public void deleteMember(int num);
	public int idcheck(String id);
	public int emailcheck(String email);
	public boolean login(String id, String password);
	public List<Map<String, Object>> getLoginInfo(String id);
	public int checkKakaoMember(MemberDto dto);

}
