package com.example.usermanagement.service;

import com.example.usermanagement.model.ERole;
import com.example.usermanagement.model.Role;
import com.example.usermanagement.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Cacheable(value = "roles", key = "#name", unless = "#result == null")
    public Optional<Role> getRoleByName(ERole name) {
        log.debug("Getting role by name: {}", name);
        return roleRepository.findByName(name);
    }

    @Cacheable(value = "roles", key = "'all'")
    public List<Role> getAllRoles() {
        log.debug("Getting all roles");
        return roleRepository.findAll();
    }

    @Transactional
    @CacheEvict(value = "roles", allEntries = true)
    public Role saveRole(Role role) {
        log.debug("Saving role: {}", role.getName());
        return roleRepository.save(role);
    }

    @CacheEvict(value = "roles", allEntries = true)
    public void clearCache() {
        log.debug("Clearing roles cache");
    }
}
