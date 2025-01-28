package com.example.profservice.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
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
    private String email;
    private String adresse;
    private String numTele;


}
