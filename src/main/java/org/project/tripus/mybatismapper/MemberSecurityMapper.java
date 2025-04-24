package org.project.tripus.mybatismapper;

import java.util.Map;
import java.util.Optional;
import org.apache.ibatis.annotations.Mapper;
import org.project.tripus.dto.MemberSecurityDto;

@Mapper
public interface MemberSecurityMapper {

	Optional<MemberSecurityDto> findOneWithAuthoritiesById(String id);
	
	// 로그인
    MemberSecurityDto getMemberById(String id);
    MemberSecurityDto getLoginInfo(String id);
    
    // 권한 정보 얻기
    String getMemberAuthorityById(String id);

    // 회원가입
    void saveMember(MemberSecurityDto member);
    
    // 회원가입 시 권한 부여
    void saveAuthority(Map<String, String> map);
    
    // 비밀번호 찾기, 변경
    int checkId(String id);
	int checkEmail(String email);
	void changePassword(Map<String, String> map);
}
