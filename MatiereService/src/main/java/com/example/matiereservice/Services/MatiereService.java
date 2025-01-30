package com.example.matiereservice.Services;

import com.example.matiereservice.Entities.Matiere;

import java.util.List;

public interface MatiereService {

    List<Matiere> findAll();
    Matiere findById(Long id);
    void save(Matiere matiere);
    void deleteById(Long id);
    List<Matiere> findByProf(Long prof_id);
    long getTotalMatieres();
    Matiere ajouterEtudiant(Long matiereId, Long etudiantId);

}
