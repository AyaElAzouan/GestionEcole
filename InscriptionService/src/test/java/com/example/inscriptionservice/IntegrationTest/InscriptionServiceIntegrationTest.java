package com.example.inscriptionservice.IntegrationTest;




import com.example.inscriptionservice.Entities.Inscription;
import com.example.inscriptionservice.Repositories.InscriptionRepository;
import com.example.inscriptionservice.Services.InscriptionServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;



@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class InscriptionServiceIntegrationTest {


    @Autowired
    private InscriptionServiceImpl inscriptionService;

    @MockBean
    private InscriptionRepository inscriptionRepository;

    @MockBean
    private RestTemplate restTemplate;

    @Test
    public void testSave_Success() {

        Inscription inscription = new Inscription();
        inscription.setEtudiantId(1L);
        inscription.setModuleId(2L);

        // Simuler un appel API REST réussi
        Mockito.when(restTemplate.postForEntity(Mockito.anyString(), Mockito.isNull(), Mockito.eq(Void.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.OK));

        // Simuler la sauvegarde en base
        Mockito.when(inscriptionRepository.save(Mockito.any(Inscription.class))).thenReturn(inscription);

        // Exécuter la méthode save()
        inscriptionService.save(inscription);

        // Vérifier que les appels aux API ont bien été faits
        Mockito.verify(restTemplate, Mockito.times(2))
                .postForEntity(Mockito.anyString(), Mockito.isNull(), Mockito.eq(Void.class));

        // Vérifier que l'inscription est bien sauvegardée
        Mockito.verify(inscriptionRepository, Mockito.times(1)).save(Mockito.any(Inscription.class));
    }

    @Test
    public void testSave_Failure_AddStudentToMatiere() {
        Inscription inscription = new Inscription();
        inscription.setEtudiantId(1L);
        inscription.setModuleId(2L);

        // Simuler un échec sur le premier appel API
        Mockito.when(restTemplate.postForEntity(Mockito.contains("/api/matieres/"), Mockito.isNull(), Mockito.eq(Void.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));

        // Exécuter la méthode save() et vérifier qu'une exception est levée
        Assertions.assertThrows(RuntimeException.class, () -> inscriptionService.save(inscription));

        // Vérifier que le repository **n'est pas appelé** car l'erreur survient avant
        Mockito.verify(inscriptionRepository, Mockito.never()).save(Mockito.any(Inscription.class));
    }

    @Test
    public void testSave_Failure_AddMatiereToStudent() {
        Inscription inscription = new Inscription();
        inscription.setEtudiantId(1L);
        inscription.setModuleId(2L);

        // Simuler un succès sur le premier appel (ajout étudiant -> matière)
        Mockito.when(restTemplate.postForEntity(Mockito.contains("/api/matieres/"), Mockito.isNull(), Mockito.eq(Void.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.OK));

        // Simuler un échec sur le deuxième appel (ajout matière -> étudiant)
        Mockito.when(restTemplate.postForEntity(Mockito.contains("/api/etudiants/"), Mockito.isNull(), Mockito.eq(Void.class)))
                .thenReturn(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));

        // Exécuter la méthode save() et vérifier qu'une exception est levée
        Assertions.assertThrows(RuntimeException.class, () -> inscriptionService.save(inscription));

        // Vérifier que le repository **n'est pas appelé** car l'erreur survient avant
        Mockito.verify(inscriptionRepository, Mockito.never()).save(Mockito.any(Inscription.class));
    }
    }
