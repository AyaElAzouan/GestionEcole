package com.example.inscriptionservice.IntegrationTest;

import com.example.inscriptionservice.Entities.Inscription;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;  // Import pour JUnit 5
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import org.junit.jupiter.api.extension.ExtendWith;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ServiceIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testCommunicationBetweenMicroservices() {
        Inscription inscription = new Inscription();
        inscription.setEtudiantId(3L);
        inscription.setModuleId(3L);

        ResponseEntity<Inscription> response = restTemplate.postForEntity(
                "http://localhost:8080/INSCRIPTIONSERVICE/api/inscriptions",  // URL de l'API Gateway
                inscription,
                Inscription.class
        );

        // Vérification du résultat
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

    }

}
