package ensat.elhaddad.sudentservice.Repositories;

import ensat.elhaddad.sudentservice.Entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EtudiantRepository extends JpaRepository<Etudiant,Long> {
}
