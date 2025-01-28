package com.example.matiereservice.Repositories;

import com.example.matiereservice.Entities.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MatiereRepository extends JpaRepository<Matiere,Long> {

    // Rechercher toutes les matières associées à un professeur spécifique
    List<Matiere> findByProfId(Long profId);
    // Méthode pour compter le nombre total de matières
    long count();
}
