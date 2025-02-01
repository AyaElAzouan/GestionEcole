package ensat.elhaddad.sudentservice.testIntegration;

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
public class EtudiantIntegrationTest {

        @LocalServerPort
        private int port;  // Injection du port aléatoire pour le test

        private TestRestTemplate restTemplate = new TestRestTemplate();

        @Test
        public void testGetAllEtudiants() {
            // Construire l'URL dynamique en utilisant le port injecté
            String url = "http://localhost:" + port + "/api/etudiants";

            // Effectuer la requête GET
            ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, null, List.class);

            // Vérifications
            assertEquals(HttpStatus.OK, response.getStatusCode());  // Vérifier que la réponse est OK
            assertNotNull(response.getBody());  // Vérifier que la réponse n'est pas nulle
        }


}
