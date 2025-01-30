package com.example.inscriptionservice.Services;

import com.example.inscriptionservice.Entities.Inscription;
import com.example.inscriptionservice.Repositories.InscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class InscriptionServiceImpl implements InscriptionService {

    @Autowired
    private InscriptionRepository inscriptionRepository;

    private final RestTemplate restTemplate;

    @Autowired
    public InscriptionServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

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
        Long etudiantId = inscription.getEtudiantId();
        Long matiereId = inscription.getModuleId(); // Assurez-vous que c'est bien l'ID de la matière

        // Appel API pour ajouter l’étudiant à la matière
        String matiereUrl = "http://localhost:8083/api/matieres/" + matiereId + "/etudiants/" + etudiantId;
        try {
            ResponseEntity<Void> matiereResponse = restTemplate.postForEntity(matiereUrl, null, Void.class);
            if (!matiereResponse.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to add student to matiere");
            }
        } catch (Exception e) {
            // Log ou gestion d'erreur spécifique
            e.printStackTrace();
            throw new RuntimeException("Error while adding student to matiere", e);
        }

        // Appel API pour ajouter la matière à l’étudiant
        String etudiantUrl = "http://localhost:8082/api/etudiants/" + etudiantId + "/matieres/" + matiereId;
        try {
            ResponseEntity<Void> etudiantResponse = restTemplate.postForEntity(etudiantUrl, null, Void.class);
            if (!etudiantResponse.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to add matiere to student");
            }
        } catch (Exception e) {
            // Log ou gestion d'erreur spécifique
            e.printStackTrace();
            throw new RuntimeException("Error while adding matiere to student", e);
        }

        // Ajouter la date d'inscription
        inscription.setDateInscription(new Date());

        // Sauvegarde de l'inscription dans la base de données
        inscriptionRepository.save(inscription);
    }

    @Override
    public void deleteById(Long id) {
        inscriptionRepository.deleteById(id);
    }

    @Override
    public List<Inscription> findByEtudiant(Long etudiantId) {
        return inscriptionRepository.findByEtudiantId(etudiantId);
    }

    @Override
    public long getTotalInscriptions() {
        return inscriptionRepository.count();
    }

    @Override
    public Map<Long, Long> getInscriptionsCountByModule() {
        List<Object[]> result = inscriptionRepository.countInscriptionsByModule();

        // Convertir le résultat en une map
        Map<Long, Long> inscriptionsCountByModule = new HashMap<>();
        for (Object[] row : result) {
            Long moduleId = (Long) row[0];
            Long count = (Long) row[1];
            inscriptionsCountByModule.put(moduleId, count);
        }

        return inscriptionsCountByModule;
    }
}
