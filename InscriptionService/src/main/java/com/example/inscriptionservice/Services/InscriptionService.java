package com.example.inscriptionservice.Services;

import com.example.inscriptionservice.Entities.Inscription;

import java.util.List;
import java.util.Map;

public interface InscriptionService {


    List<Inscription> findAll();
    Inscription findById(Long id);
    void save(Inscription inscription);
    void deleteById(Long id);
    List<Inscription> findByEtudiant(Long Etudiant_id);
    List<Inscription> findByModule(Long moduleId);
    long getTotalInscriptions();
   Map<Long, Long> getInscriptionsCountByModule();
    void annulerInscription(Long etudiantId, Long matiereId);

}
