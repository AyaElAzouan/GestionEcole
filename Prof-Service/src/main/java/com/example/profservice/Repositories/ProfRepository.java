package com.example.profservice.Repositories;

import com.example.profservice.Entities.Professeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfRepository  extends JpaRepository<Professeur,Long> {
}
