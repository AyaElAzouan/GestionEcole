package com.example.matiereservice.Controllers;

import com.example.matiereservice.Entities.Matiere;
import com.example.matiereservice.Services.MatiereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matieres")
public class MatierController {
    @Autowired
    MatiereService matiereService;

    // Récupérer la liste de tous les matieres
    @GetMapping
    public List<Matiere> getAllMatieres() {
        return matiereService.findAll();
    }

    // Récupérer un Matière par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Matiere> getMatiereById(@PathVariable Long id) {
        Matiere matiere= matiereService.findById(id);
        if (matiere != null) {
            return ResponseEntity.ok(matiere);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Ajouter une nouvelle Matières
    @PostMapping
    public ResponseEntity<Matiere> createMatiere(@RequestBody Matiere matiere) {
        matiereService.save(matiere);
        return ResponseEntity.ok(matiere);
    }

    // Mettre à jour une Matière existant
    @PutMapping("/{id}")
    public ResponseEntity<Matiere> updateMatiere(@PathVariable Long id, @RequestBody Matiere updatedMatiere) {
        Matiere existingMatiere= matiereService.findById(id);
        if (existingMatiere!= null) {
            updatedMatiere.setId(id); // S'assurer que l'ID correspond
            matiereService.save(updatedMatiere);
            return ResponseEntity.ok(updatedMatiere);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer une matiere par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        Matiere existingMatiere= matiereService.findById(id);
        if (existingMatiere != null) {
            matiereService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/prof/{id}")
    public List<Matiere> getMatiereByProf(@PathVariable Long id) {
      return matiereService.findByProf(id);
    }

    // Endpoint pour obtenir le nombre total de matières
    @GetMapping("/total")
    public long getTotalMatieres() {
        return matiereService.getTotalMatieres();
    }

    @PutMapping("/assigner/{id}")
    public ResponseEntity<Matiere> assignerProf(@PathVariable Long id, @RequestParam Long ProfId) {
        // Recherche de la matière par ID
        Matiere existingMatiere = matiereService.findById(id);

        // Vérification si la matière existe
        if (existingMatiere != null) {

            existingMatiere.setProfId(ProfId);

            matiereService.save(existingMatiere);

            return ResponseEntity.ok(existingMatiere);
        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{matiereId}/etudiants/{etudiantId}")
    public ResponseEntity<Matiere> ajouterEtudiant(@PathVariable Long matiereId, @PathVariable Long etudiantId) {
        Matiere matiere = matiereService.ajouterEtudiant(matiereId, etudiantId);
        return ResponseEntity.ok(matiere);
    }
}
