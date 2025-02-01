package com.proj.backend.Services;






import com.proj.backend.Entities.Professeur;
import com.proj.backend.Repositories.ProfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfServiceImpl implements ProfService{
    @Autowired
    private ProfRepository profRepository;

    @Override
    public List<Professeur> findAll() {
        return profRepository.findAll();
    }

    @Override
    public Professeur findById(Long id) {
        return profRepository.findById(id).orElse(null);
    }

  @Override
    public void save(Professeur professeur) {
        profRepository.save(professeur);
    }

    @Override
    public void deleteById(Long id) {
        profRepository.deleteById(id);
    }
    @Override
    public Professeur addMatiereToProfesseur(Long profId, Long matiereId) {
        Optional<Professeur> professeurOpt = profRepository.findById(profId);
        if (professeurOpt.isPresent()) {
            Professeur professeur = professeurOpt.get();
            // Ajoute l'ID de la matière à la liste des matières du professeur
            professeur.getMatieres().add(matiereId);
            return profRepository.save(professeur);
        }
        throw new RuntimeException("Professeur non trouvé");
    }
    @Override

        public Professeur findByUserId(Long id) {
        return profRepository.findByUserId(id).orElse(null);

    }
    @Override
    public  long getTotalProfs(){
        return profRepository.count();
    }
}
