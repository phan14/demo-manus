package com.example.usermanagement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "permissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Permission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private EPermission name;

    @Column(length = 100)
    private String description;

    public Permission(EPermission name) {
        this.name = name;
    }

    public Permission(EPermission name, String description) {
        this.name = name;
        this.description = description;
    }
}
