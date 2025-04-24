package org.project.tripus.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.project.tripus.dto.MemberDto;
import org.project.tripus.dto.MemberSecurityDto;
import org.project.tripus.mybatismapper.MemberMapper;
import org.project.tripus.mybatismapper.MemberSecurityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberMapper memberMapper;

    @Autowired
    private MemberSecurityMapper memberSecurityMapper;

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

    @Transactional
    public void join(MemberSecurityDto member, String role) {
//        member.setPassword(passwordEncoder.encode(member.getPassword()));
        member.setAccountNonExpired(true);
        member.setAccountNonLocked(true);
        member.setCredentialsNonExpired(true);
        member.setEnabled(true);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(role));

        member.setAuthorities(grantedAuthorities);
        member.setType(1);    // 1 : 일반회원
        memberSecurityMapper.saveMember(member);

        Map<String, String> map = new HashMap<>();
        map.put("id", member.getId());
        map.put("authority_name", role);
        memberSecurityMapper.saveAuthority(map);
    }

    @Transactional
    public void kakaoJoin(MemberSecurityDto member, String role) {
        member.setAccountNonExpired(true);
        member.setAccountNonLocked(true);
        member.setCredentialsNonExpired(true);
        member.setEnabled(true);

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(role));

        member.setAuthorities(grantedAuthorities);
        member.setType(2);    // 1 : 일반회원
        memberSecurityMapper.saveMember(member);

        Map<String, String> map = new HashMap<>();
        map.put("id", member.getId());
        map.put("authority_name", role);
        memberSecurityMapper.saveAuthority(map);
    }

    public int checkId(String id) {
        return memberSecurityMapper.checkId(id);
    }

    public int checkEmail(String email) {
        return memberSecurityMapper.checkEmail(email);
    }

    public void changePassword(String id, String password) {
        Map<String, String> map = new HashMap<>();
        map.put("id", id);
//		map.put("password", passwordEncoder.encode(password));

        memberSecurityMapper.changePassword(map);
    }

    public MemberSecurityDto getLoginInfo2(String id) throws UsernameNotFoundException {
        return memberSecurityMapper.getLoginInfo(id);
    }
}
