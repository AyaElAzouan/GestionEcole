package com.example.matiereservice.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class Matiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private int nbrHeure;
    private String filiere;
    private Long profId;
    @ElementCollection
    private List<Long> etudiants;

}
