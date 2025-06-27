package org.project.tripus.util;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import java.security.Key;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    private final Key secretKey;
    private final long accessTokenExpirationTime;
    private final long refreshTokenExpirationTime;

    public JwtUtil(@Value("${jwt.secret_key}") String secretKey,
        @Value("${jwt.access_token_expiration_time}") long accessTokenExpirationTime,
        @Value("${jwt.refresh_token_expiration_time}") long refreshTokenExpirationTime) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        this.accessTokenExpirationTime = accessTokenExpirationTime;
        this.refreshTokenExpirationTime = refreshTokenExpirationTime;
    }

    public String generateAccessToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationTime))
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpirationTime))
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact();
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public TokenStatus validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);

            return TokenStatus.VALID;
        } catch(ExpiredJwtException e) {
            // 만료된 토큰
            return TokenStatus.EXPIRED;
        } catch(UnsupportedJwtException e) {
            // 지원하지 않는 형식
            return TokenStatus.INVALID;
        } catch(MalformedJwtException e) {
            // 잘못된 구조
            return TokenStatus.INVALID;
        } catch(SignatureException e) {
            // 위조 가능성
            return TokenStatus.INVALID;
        } catch(IllegalArgumentException e) {
            // 빈 값 또는 null
            return TokenStatus.INVALID;
        }
    }

    public enum TokenStatus {
        VALID, EXPIRED, INVALID
    }
}
