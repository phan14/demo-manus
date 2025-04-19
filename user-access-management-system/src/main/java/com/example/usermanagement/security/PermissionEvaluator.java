package com.example.usermanagement.security;

import com.example.usermanagement.model.EPermission;
import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import com.example.usermanagement.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class PermissionEvaluator implements org.springframework.security.access.PermissionEvaluator {

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetailsImpl)) {
            return false;
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<User> userOpt = userRepository.findById(userDetails.getId());

        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        String permissionName = permission.toString();

        // Check if any of the user's roles have the required permission
        return user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .anyMatch(perm -> perm.getName().name().equals(permissionName));
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetailsImpl)) {
            return false;
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Optional<User> userOpt = userRepository.findById(userDetails.getId());

        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();
        String permissionName = permission.toString();

        // Check if any of the user's roles have the required permission
        return user.getRoles().stream()
                .flatMap(role -> role.getPermissions().stream())
                .anyMatch(perm -> perm.getName().name().equals(permissionName));
    }
}
