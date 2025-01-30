package com.example.matiereservice.Services;

import com.example.matiereservice.Entities.Matiere;
import com.example.matiereservice.Repositories.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MatiereServiceImpl implements MatiereService{
    @Autowired
    private MatiereRepository matiereRepository;

    @Override
    public List<Matiere> findAll() {
        return matiereRepository.findAll();
    }

    @Override
    public Matiere findById(Long id) {
        return matiereRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Matiere matiere) {
        matiereRepository.save(matiere);
    }

    @Override
    public void deleteById(Long id) {
        matiereRepository.deleteById(id);
    }
    @Override
    public List<Matiere>findByProf(Long prof_id){
        return matiereRepository.findByProfId(prof_id);
    }
    @Override
    // Méthode pour obtenir le nombre total de matières
    public long getTotalMatieres() {
        return matiereRepository.count();
    }
    @Override
    public Matiere ajouterEtudiant(Long matiereId, Long etudiantId) {
        Optional<Matiere> matiereOpt = matiereRepository.findById(matiereId);

        if (matiereOpt.isPresent()) {
            Matiere matiere = matiereOpt.get();

            // Vérifier si l'étudiant n'est pas déjà inscrit
            if (!matiere.getEtudiants().contains(etudiantId)) {
                matiere.getEtudiants().add(etudiantId);
                matiereRepository.save(matiere); // Sauvegarde des modifications
            }

            return matiere;
        } else {
            throw new RuntimeException("Matière non trouvée avec ID : " + matiereId);
        }
    }


}
