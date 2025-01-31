package com.proj.backend.Repositories;




import com.proj.backend.Entities.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfRepository extends JpaRepository<Professeur,Long> {
    Optional<Professeur> findByUserId(Long userId);
}
