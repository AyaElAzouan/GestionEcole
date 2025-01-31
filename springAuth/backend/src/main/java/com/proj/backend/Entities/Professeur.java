package com.proj.backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Professeur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String cin;
    @Column(nullable = false, unique = true)
    private String code;
    private String nom;
    private String prenom;

    private String adresse;
    private String numTele;
    @ElementCollection
    private List<Long> matieres;
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;


}
