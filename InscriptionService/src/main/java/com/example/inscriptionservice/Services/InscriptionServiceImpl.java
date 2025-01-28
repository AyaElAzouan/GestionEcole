package com.example.inscriptionservice.Services;

import com.example.inscriptionservice.Entities.Inscription;
import com.example.inscriptionservice.Repositories.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InscriptionServiceImpl implements InscriptionService{


    @Autowired
    private InscriptionRepository inscriptionRepository;

    @Override
    public List<Inscription> findAll() {
        return inscriptionRepository.findAll();
    }

    @Override
    public Inscription findById(Long id) {
        return inscriptionRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Inscription inscription) {
       inscription.setDateInscription(new Date());
       inscriptionRepository.save(inscription);
    }

    @Override
    public void deleteById(Long id) {
        inscriptionRepository.deleteById(id);
    }
    @Override
    public List<Inscription>findByEtudiant(Long etudiant_id){
        return inscriptionRepository.findByEtudiantId(etudiant_id);
    }
    @Override
    // Méthode pour obtenir le nombre total de inscriptions
    public long getTotalInscriptions() {
        return inscriptionRepository.count();
    }
    @Override
    public Map<Long, Long> getInscriptionsCountByModule() {
        List<Object[]> result = inscriptionRepository.countInscriptionsByModule();

        // Convert the result into a map
        Map<Long, Long> inscriptionsCountByModule = new HashMap<>();
        for (Object[] row : result) {
            Long moduleId = (Long) row[0];
            Long count = (Long) row[1];
            inscriptionsCountByModule.put(moduleId, count);
        }

        return inscriptionsCountByModule;
    }
}
