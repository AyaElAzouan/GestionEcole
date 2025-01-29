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
    public  long getTotalEtudaints(){
       return etudiantRepository.count();
    }

}
