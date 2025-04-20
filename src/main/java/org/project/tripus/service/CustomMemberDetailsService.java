package org.project.tripus.service;

import java.util.HashSet;
import java.util.Set;
import org.project.tripus.dto.MemberSecurityDto;
import org.project.tripus.mapper.MemberSecurityMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomMemberDetailsService implements UserDetailsService {

    @Autowired
    private MemberSecurityMapper mapper;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        MemberSecurityDto member = mapper.getMemberById(id);

        if(member == null) {
            throw new UsernameNotFoundException(id);
        }

        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority(mapper.getMemberAuthorityById(id)));
        member.setAuthorities(grantedAuthorities);

        return member;
    }

}
