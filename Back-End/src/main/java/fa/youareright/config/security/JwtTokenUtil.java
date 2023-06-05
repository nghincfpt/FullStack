package fa.youareright.config.security;

import fa.youareright.model.Account;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;


@Component
public class JwtTokenUtil {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);

    private static final long EXPIRE_DURATION = 1 * 60 * 60 * 1000; // 1 hour

    @Value("${app.jwt.secret}")
    private String secretKey;

    public String generateAccessToken(Account acc) {
        return Jwts.builder()
                .setSubject(acc.getUsername())
                .claim("roles", acc.getRoles().toString())
                .setIssuer(acc.getAccountId().toString())
                .setAudience(acc.getUser().getUserId().toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .signWith(SignatureAlgorithm.HS512, secretKey).compact();
    }

    public boolean validateAccessToken(String token) {

        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);

            return true;
        } catch (ExpiredJwtException e) {
            LOGGER.error("JWT expired", e);
        } catch (IllegalArgumentException e) {
            LOGGER.error("Token is null, empty or has only whitespace", e);
        } catch (MalformedJwtException e) {
            LOGGER.error("JWT is invalid", e);
        } catch (UnsupportedJwtException e) {
            LOGGER.error("JWTis not supported", e);
        } catch (SignatureException e) {
            LOGGER.error("Signature validation failed", e);
        }
        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    public Claims parseClaims(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
    }

}
