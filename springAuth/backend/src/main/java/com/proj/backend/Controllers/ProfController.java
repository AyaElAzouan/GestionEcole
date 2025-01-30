package com.proj.backend.Controllers;



import com.proj.backend.Entities.Professeur;
import com.proj.backend.Services.ProfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public List<Professeur> getAllEtudiants() {
        return profService.findAll();
    }

    // Récupérer un Professeur par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Professeur> getEtudiantById(@PathVariable Long id) {
        Professeur professeur= profService.findById(id);
        if (professeur != null) {
            return ResponseEntity.ok(professeur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    // Mettre à jour un prof existant
    @PutMapping("/{id}")
    public ResponseEntity<Professeur> updateEtudiant(@PathVariable Long id, @RequestBody Professeur updatedProfesseur) {
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
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        Professeur existingProf = profService.findById(id);
        if (existingProf != null) {
            profService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // Ajouter un ID de matière à un professeur
    @PutMapping("/{profId}/ajouterMatiere/{matiereId}")
    public ResponseEntity<Professeur> addMatiereToProfesseur(@PathVariable Long profId, @PathVariable Long matiereId) {
        Professeur updatedProfesseur = profService.addMatiereToProfesseur(profId, matiereId);
        return new ResponseEntity<>(updatedProfesseur, HttpStatus.OK);
    }
}
