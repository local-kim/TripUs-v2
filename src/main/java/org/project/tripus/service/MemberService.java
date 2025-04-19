package org.project.tripus.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.project.tripus.dto.MemberDto;
import org.project.tripus.mapper.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService implements MemberServiceInter {

	@Autowired
	private MemberMapper memberMapper;

	@Override
	public void insertMember(MemberDto dto) {
		// TODO Auto-generated method stub
		memberMapper.insertMember(dto);
		
	}

	@Override
	public String getName(String id) {
		// TODO Auto-generated method stub
		return memberMapper.getName(id);
	}

//	@Override
//	public int loginCheck(String id, String password) {
//		// TODO Auto-generated method stub
//		Map<String, String> map=new HashMap<>();
//		map.put("id", id);
//		map.put("password", password);
//		return memberMapper.logincheck(map);
//	}

	@Override
	public void deleteMember(int num) {
		// TODO Auto-generated method stub
		memberMapper.deleteMember(num);
		
	}

	@Override
	public int idcheck(String id) {
		// TODO Auto-generated method stub
		return memberMapper.idcheck(id);
	}

	@Override
	public int emailcheck(String email) {
		// TODO Auto-generated method stub
		return memberMapper.emailcheck(email);
	}

	@Override
	public boolean login(String id, String password) {
		// TODO Auto-generated method stub
		Map<String, String> map = new HashMap<>();
		map.put("id", id);
		map.put("password", password);
		
		return memberMapper.login(map) == 1 ? true : false;
	}

	@Override
	public List<Map<String, Object>> getLoginInfo(String id) {
		// TODO Auto-generated method stub
		return memberMapper.getLoginInfo(id);
	}

	@Override
	public int checkKakaoMember(MemberDto dto) {
		// TODO Auto-generated method stub
		return memberMapper.checkKakaoMember(dto);
	}

}
