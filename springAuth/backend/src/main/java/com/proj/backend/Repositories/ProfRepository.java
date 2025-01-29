package com.proj.backend.Repositories;




import com.proj.backend.Entities.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfRepository extends JpaRepository<Professeur,Long> {
}
