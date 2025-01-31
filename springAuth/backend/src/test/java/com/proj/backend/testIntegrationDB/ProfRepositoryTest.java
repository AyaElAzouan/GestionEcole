package com.proj.backend.testIntegrationDB;


import com.proj.backend.Entities.Professeur;
import com.proj.backend.Entities.Role;
import com.proj.backend.Entities.User;
import com.proj.backend.Repositories.ProfRepository;
import com.proj.backend.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class ProfRepositoryTest {
    @Autowired
    private ProfRepository profRepository;
    @Autowired
    private UserRepository userRepository;
    private Professeur professeur;

    @BeforeEach
    public void setup() {
        User user = new User();
        user.setEmail("prof@example.com");
        user.setPassword("securePass");
        user.setRole(Role.PROFESSEUR);
        user = userRepository.save(user);
        professeur = Professeur.builder()
                .cin("ABC123")
                .code("PROF001")
                .nom("Dupont")
                .prenom("Jean")
                .adresse("adresse inconnu")
                .numTele("0265445")
                .user(user)
                .build();
    }

    @Test
    public void testSaveAndFindById() {
        // Sauvegarder un professeur dans la base de données
        Professeur savedProfesseur = profRepository.save(professeur);

        // Vérifier si le professeur a bien été sauvegardé
        Optional<Professeur> foundProfesseur = profRepository.findById(savedProfesseur.getId());
        assertTrue(foundProfesseur.isPresent());
        assertEquals(savedProfesseur.getCode(), foundProfesseur.get().getCode());
    }



    @Test
    public void testDelete() {
        // Sauvegarder un professeur
        Professeur savedProfesseur = profRepository.save(professeur);

        // Supprimer le professeur
        profRepository.delete(savedProfesseur);

        // Vérifier que le professeur n'existe plus
        Optional<Professeur> deletedProfesseur = profRepository.findById(savedProfesseur.getId());
        assertFalse(deletedProfesseur.isPresent());
    }
}
