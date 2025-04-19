package com.example.usermanagement.security.jwt;

import com.example.usermanagement.security.services.UserDetailsImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Collections;

import static org.assertj.core.api.Assertions.assertThat;

public class JwtUtilsTest {

    private JwtUtils jwtUtils;
    private UserDetailsImpl userDetails;

    @BeforeEach
    public void setup() {
        jwtUtils = new JwtUtils();
        ReflectionTestUtils.setField(jwtUtils, "jwtSecret", "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437");
        ReflectionTestUtils.setField(jwtUtils, "jwtExpirationMs", 86400000);
        ReflectionTestUtils.setField(jwtUtils, "refreshExpirationMs", 604800000);

        userDetails = new UserDetailsImpl(
                1L,
                "testuser",
                "test@example.com",
                "Test",
                "User",
                "password",
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
        );
    }

    @Test
    public void testGenerateJwtToken() {
        String token = jwtUtils.generateJwtToken(userDetails);
        assertThat(token).isNotNull();
        assertThat(token).isNotEmpty();
    }

    @Test
    public void testGenerateRefreshToken() {
        String refreshToken = jwtUtils.generateRefreshToken(userDetails);
        assertThat(refreshToken).isNotNull();
        assertThat(refreshToken).isNotEmpty();
    }

    @Test
    public void testGetUserNameFromJwtToken() {
        String token = jwtUtils.generateJwtToken(userDetails);
        String username = jwtUtils.getUserNameFromJwtToken(token);
        assertThat(username).isEqualTo("testuser");
    }

    @Test
    public void testValidateJwtToken() {
        String token = jwtUtils.generateJwtToken(userDetails);
        boolean isValid = jwtUtils.validateJwtToken(token);
        assertThat(isValid).isTrue();
    }

    @Test
    public void testValidateJwtTokenInvalid() {
        boolean isValid = jwtUtils.validateJwtToken("invalidToken");
        assertThat(isValid).isFalse();
    }
}
