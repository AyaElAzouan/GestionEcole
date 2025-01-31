package com.proj.backend.testControllers;


import com.proj.backend.Entities.*;
import com.proj.backend.Services.ProfService;
import com.proj.backend.auth.*;
import com.proj.backend.config.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;


import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.http.MediaType;

import java.util.Collections;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class ProfControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfService profService;

    private Professeur professeur;

    @BeforeEach
    public void setup() {
        // Initialisation d'un professeur pour les tests
        professeur = Professeur.builder()
                .id(1L)
                .cin("ABC123")
                .code("PROF001")
                .nom("Dupont")
                .prenom("Jean")
                .adresse("adresse inconnue")
                .numTele("0265445")
                .build();
    }

    @Test
    public void testGetAllProfesseurs() throws Exception {
        // Simulation de la méthode findAll() du service
        when(profService.findAll()).thenReturn(Collections.singletonList(professeur));

        mockMvc.perform(get("/api/professeurs"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].cin").value("ABC123"))
                .andExpect(jsonPath("$[0].nom").value("Dupont"));

        verify(profService, times(1)).findAll();
    }

    @Test
    public void testGetProfesseurById() throws Exception {
        // Simulation de la méthode findById() du service
        when(profService.findById(1L)).thenReturn(professeur);

        mockMvc.perform(get("/api/professeurs/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cin").value("ABC123"))
                .andExpect(jsonPath("$.nom").value("Dupont"));

        verify(profService, times(1)).findById(1L);
    }

    @Test
    public void testGetProfesseurByIdNotFound() throws Exception {
        // Simulation d'un professeur introuvable
        when(profService.findById(1L)).thenReturn(null);

        mockMvc.perform(get("/api/professeurs/{id}", 1L))
                .andExpect(status().isNotFound());

        verify(profService, times(1)).findById(1L);
    }

    @Test
    public void testUpdateProfesseur() throws Exception {
        // Simulation de la méthode findById() et save() du service
        when(profService.findById(1L)).thenReturn(professeur);
        doAnswer(invocation -> {
            Professeur updatedProf = invocation.getArgument(0);  // Obtenir l'argument passé à save
            updatedProf.setId(1L);  // Assurer que l'ID est conservé
            return null;  // Pas de retour attendu
        }).when(profService).save(any(Professeur.class));

        Professeur updatedProfesseur = professeur;
        updatedProfesseur.setNom("Nouvelle Nom");

        mockMvc.perform(put("/api/professeurs/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"cin\":\"ABC123\",\"code\":\"PROF001\",\"nom\":\"Nouvelle Nom\",\"prenom\":\"Jean\",\"adresse\":\"adresse inconnue\",\"numTele\":\"0265445\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nom").value("Nouvelle Nom"));

        verify(profService, times(1)).findById(1L);
        verify(profService, times(1)).save(any(Professeur.class));
    }

    @Test
    public void testUpdateProfesseurNotFound() throws Exception {
        // Simulation de la méthode findById() retournant null
        when(profService.findById(1L)).thenReturn(null);

        mockMvc.perform(put("/api/professeurs/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"cin\":\"ABC123\",\"code\":\"PROF001\",\"nom\":\"Nouvelle Nom\",\"prenom\":\"Jean\",\"adresse\":\"adresse inconnue\",\"numTele\":\"0265445\"}"))
                .andExpect(status().isNotFound());

        verify(profService, times(1)).findById(1L);
    }

    @Test
    public void testDeleteProfesseur() throws Exception {
        // Simulation de la méthode findById() et deleteById() du service
        when(profService.findById(1L)).thenReturn(professeur);

        mockMvc.perform(delete("/api/professeurs/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(profService, times(1)).findById(1L);
        verify(profService, times(1)).deleteById(1L);
    }

    @Test
    public void testDeleteProfesseurNotFound() throws Exception {
        // Simulation de la méthode findById() retournant null
        when(profService.findById(1L)).thenReturn(null);

        mockMvc.perform(delete("/api/professeurs/{id}", 1L))
                .andExpect(status().isNotFound());

        verify(profService, times(1)).findById(1L);
    }
}
