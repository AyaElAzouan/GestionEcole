package com.example.inscriptionservice.Controller;

import com.example.inscriptionservice.Entities.Inscription;
import com.example.inscriptionservice.Services.InscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.LineNumberReader;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inscriptions")
public class InscriptionController {

    @Autowired
    InscriptionService inscriptionService;


    @GetMapping
    public List<Inscription> getAllInscriptions() {
        return inscriptionService.findAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<Inscription> getInscriptionById(@PathVariable Long id) {
        Inscription inscription=inscriptionService.findById(id);
        if (inscription != null) {
            return ResponseEntity.ok(inscription);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<Inscription> createInscription(@RequestBody Inscription inscription) {
        inscriptionService.save(inscription);
        return ResponseEntity.ok(inscription);
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
      Inscription existingInscription= inscriptionService.findById(id);
        if (existingInscription != null) {
            inscriptionService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/etudiant/{id}")
    public List<Inscription> getMatiereByEtudiant(@PathVariable Long id) {
        return inscriptionService.findByEtudiant(id);
    }


    @GetMapping("/total")
    public long getTotalInscriptions() {
        return inscriptionService.getTotalInscriptions();
    }

    @GetMapping("/count-by-module")
    public ResponseEntity<Map<Long, Long>> getInscriptionsCountByModule() {
        Map<Long, Long> inscriptionsCountByModule = inscriptionService.getInscriptionsCountByModule();
        return ResponseEntity.ok(inscriptionsCountByModule);
    }

}
