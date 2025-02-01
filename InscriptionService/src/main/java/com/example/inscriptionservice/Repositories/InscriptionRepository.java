package com.example.inscriptionservice.Repositories;

import com.example.inscriptionservice.Entities.Inscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InscriptionRepository extends JpaRepository<Inscription,Long> {

    List<Inscription> findByEtudiantId(Long etudiantId);


    List<Inscription> findByModuleId(Long moduleId);

    @Override
    long count();
    @Query("SELECT i.moduleId, COUNT(i) FROM Inscription i GROUP BY i.moduleId")
    List<Object[]> countInscriptionsByModule();
    Inscription findByEtudiantIdAndModuleId(Long etudiantId, Long moduleId);
}
