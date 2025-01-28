package com.example.profservice.Services;

import com.example.profservice.Entities.Professeur;

import java.util.List;

public interface ProfService {

    List<Professeur> findAll();
    Professeur findById(Long id);
    void save(Professeur professeur);
    void deleteById(Long id);
}