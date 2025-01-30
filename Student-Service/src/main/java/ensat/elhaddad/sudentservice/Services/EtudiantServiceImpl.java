package ensat.elhaddad.sudentservice.Services;

import ensat.elhaddad.sudentservice.Entities.Etudiant;
import ensat.elhaddad.sudentservice.Repositories.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EtudiantServiceImpl implements EtudiantService{
    @Autowired
    private EtudiantRepository etudiantRepository;

    @Override
    public List<Etudiant> findAll() {
        return etudiantRepository.findAll();
    }

    @Override
    public Etudiant findById(Long id) {
        return etudiantRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Etudiant etudiant) {
        etudiantRepository.save(etudiant);
    }

    @Override
    public void deleteById(Long id) {
       etudiantRepository.deleteById(id);
    }
    @Override

    public Etudiant ajouterMatiere(Long etudiantId, Long matiereId) {
        Optional<Etudiant> etudiantOpt = etudiantRepository.findById(etudiantId);

        if (etudiantOpt.isPresent()) {
            Etudiant etudiant = etudiantOpt.get();

            // Vérifier si la matière est déjà présente
            if (!etudiant.getMatieres().contains(matiereId)) {
                etudiant.getMatieres().add(matiereId);
                etudiantRepository.save(etudiant); // Sauvegarde des modifications
            }

            return etudiant;
        } else {
            throw new RuntimeException("Étudiant non trouvé avec ID : " + etudiantId);
        }
    }


    public  long getTotalEtudaints(){
       return etudiantRepository.count();
    }


}
