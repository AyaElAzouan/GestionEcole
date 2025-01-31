package com.proj.backend.Services;
import com.proj.backend.Entities.Professeur;

import java.util.List;

public interface ProfService {

    List<Professeur> findAll();
    Professeur findById(Long id);
    Professeur findByUserId(Long id);
    void save(Professeur professeur);
    void deleteById(Long id);
}