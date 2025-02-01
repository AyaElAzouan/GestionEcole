package ensat.elhaddad.sudentservice.Controller;

import ensat.elhaddad.sudentservice.Entities.Etudiant;
import ensat.elhaddad.sudentservice.Services.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
public class EtudiantController {
    @Autowired
    EtudiantService etudiantService;

    // Récupérer la liste de tous les étudiants
    @GetMapping
    public List<Etudiant> getAllEtudiants() {
        return etudiantService.findAll();
    }

    // Récupérer un étudiant par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Etudiant> getEtudiantById(@PathVariable Long id) {
        Etudiant etudiant = etudiantService.findById(id);
        if (etudiant != null) {
            return ResponseEntity.ok(etudiant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Ajouter un nouvel étudiant
    @PostMapping
    public ResponseEntity<Etudiant> createEtudiant(@RequestBody Etudiant etudiant) {
        etudiantService.save(etudiant);
        return ResponseEntity.ok(etudiant);
    }

    // Mettre à jour un étudiant existant
    @PutMapping("/{id}")
    public ResponseEntity<Etudiant> updateEtudiant(@PathVariable Long id, @RequestBody Etudiant updatedEtudiant) {
        Etudiant existingEtudiant = etudiantService.findById(id);
        if (existingEtudiant != null) {
            updatedEtudiant.setId(id); // S'assurer que l'ID correspond
            etudiantService.save(updatedEtudiant);
            return ResponseEntity.ok(updatedEtudiant);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Supprimer un étudiant par son ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        Etudiant existingEtudiant = etudiantService.findById(id);
        if (existingEtudiant != null) {
            etudiantService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{etudiantId}/matieres/{matiereId}")
    public ResponseEntity<Etudiant> ajouterMatiere(@PathVariable Long etudiantId, @PathVariable Long matiereId) {
        Etudiant etudiant = etudiantService.ajouterMatiere(etudiantId, matiereId);
        return ResponseEntity.ok(etudiant);
    }


    @GetMapping("/Total")
    public long getTotalEtudiants(){
        return etudiantService.getTotalEtudaints();
    }
    @DeleteMapping("/{etudiantId}/supprimer-matiere/{matiereId}")
    public ResponseEntity<Etudiant> supprimerMatiere(@PathVariable Long etudiantId, @PathVariable Long matiereId) {
        Etudiant etudiant = etudiantService.supprimerMatiere(etudiantId, matiereId);
        return ResponseEntity.ok(etudiant);
    }

}
