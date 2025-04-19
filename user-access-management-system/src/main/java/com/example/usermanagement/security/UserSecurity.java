package com.example.usermanagement.security;

import com.example.usermanagement.security.services.UserDetailsImpl;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class UserSecurity {

    /**
     * Checks if the authenticated user is accessing their own data
     * 
     * @param authentication The current authentication object
     * @param userId The user ID being accessed
     * @return true if the authenticated user is accessing their own data
     */
    public boolean isUserSelf(Authentication authentication, Long userId) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return userDetails.getId().equals(userId);
    }
}
