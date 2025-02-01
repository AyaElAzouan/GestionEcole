package com.example.matiereservice.testIntegration;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MatiereIntegrationTest {

    @LocalServerPort
    private int port;

    private TestRestTemplate restTemplate = new TestRestTemplate();

    @Test
    public void testGetAllMatieres() {
        //  l'URL dynamique avec le port injecté aléatoirement
        String url = "http://localhost:" + port + "/api/matieres";

        // la requête GET
        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, List.class);

        // Vérifications
        assertEquals(HttpStatus.OK, response.getStatusCode());  // Vérification réponse OK
        assertNotNull(response.getBody());  // Vérification  réponse not null
    }

}
