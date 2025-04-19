package com.example.usermanagement.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/test")
@Tag(name = "Test", description = "Test API for role-based access control")
public class TestController {
    
    @GetMapping("/all")
    @Operation(summary = "Public content", description = "Accessible to all users")
    public String allAccess() {
        return "Public Content.";
    }
    
    @GetMapping("/user")
    @Operation(summary = "User content", description = "Accessible to users with ROLE_USER")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public String userAccess() {
        return "User Content.";
    }

    @GetMapping("/mod")
    @Operation(summary = "Moderator content", description = "Accessible to users with ROLE_MODERATOR")
    @PreAuthorize("hasRole('MODERATOR')")
    public String moderatorAccess() {
        return "Moderator Board.";
    }

    @GetMapping("/admin")
    @Operation(summary = "Admin content", description = "Accessible to users with ROLE_ADMIN")
    @PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }
}
