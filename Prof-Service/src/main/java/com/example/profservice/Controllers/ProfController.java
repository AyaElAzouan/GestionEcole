package com.example.profservice.Controllers;


import com.example.profservice.Entities.Professeur;
import com.example.profservice.Services.ProfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professeurs")
public class ProfController {
    @Autowired
    ProfService profService;

    // Récupérer la liste de tous les professeurs
    @GetMapping
    public List<Professeur> getAllProfesseurs() {
        return profService.findAll();
    }

    // Récupérer un Professeur par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Professeur> getProfesseurById(@PathVariable Long id) {
        Professeur professeur= profService.findById(id);
        if (professeur != null) {
            return ResponseEntity.ok(professeur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Ajouter un nouvel prof
    @PostMapping
    public ResponseEntity<Professeur> createProfesseur(@RequestBody Professeur professeur) {
        profService.save(professeur);
        return ResponseEntity.ok(professeur);
    }

    // Mettre à jour un prof existant
    @PutMapping("/{id}")
    public ResponseEntity<Professeur> updateProfesseur(@PathVariable Long id, @RequestBody Professeur updatedProfesseur) {
        Professeur existingProf = profService.findById(id);
        if (existingProf != null) {
            updatedProfesseur.setId(id); // S'assurer que l'ID correspond
            profService.save(updatedProfesseur);
            return ResponseEntity.ok(updatedProfesseur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un étudiant par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfesseur(@PathVariable Long id) {
        Professeur existingProf = profService.findById(id);
        if (existingProf != null) {
            profService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
