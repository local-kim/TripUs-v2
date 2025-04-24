package org.project.tripus.mybatismapper;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.MemberDto;

@Mapper
public interface MemberMapper {

	public void insertMember(MemberDto dto);
	public String getName(String id);
//	public int logincheck(Map<String, String> map);
	public void deleteMember(int num);
	public int idcheck(String id);
	public int emailcheck(String email);
	public int login(Map<String, String> map);
	public List<Map<String, Object>> getLoginInfo(String id);
	public int checkKakaoMember(MemberDto dto);

}
