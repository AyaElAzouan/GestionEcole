package ensat.elhaddad.sudentservice.Services;

import ensat.elhaddad.sudentservice.Entities.Etudiant;

import java.util.List;
import java.util.Optional;

public interface EtudiantService {

    List<Etudiant> findAll();
    Etudiant findById(Long id);
    void save(Etudiant etudiant);
    void deleteById(Long id);

    Etudiant ajouterMatiere(Long etudiantId, Long matiereId);

    long getTotalEtudaints();



}
