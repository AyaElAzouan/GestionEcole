package com.proj.backend.testControllers;

import com.proj.backend.Entities.*;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AuthenticationControllerTest {
    @Autowired
    private MockMvc mockMvc; // Simule les requêtes HTTP

    @MockBean
    private JwtService jwtService; // Simule JwtService

    @MockBean
    private AuthenticationSercvice authenticationService; // Simule AuthenticationService

    private User user;
    private AuthenticationResponse authenticationResponse;
    private AuthenticationRequest authRequest;
    private Professeur professeur;
    private UserDetails userDetails;

    @BeforeEach
    public void setup() {
        user = User.builder()
                .email("prof@example.com")
                .password("password123")
                .role(Role.PROFESSEUR)
                .build();

        authenticationResponse = AuthenticationResponse.builder()
                .token("fake-jwt-token")
                .build();
        authRequest = AuthenticationRequest.builder()
                .email("test@example.com")
                .password("password123")
                .build();
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
    public void testRegister() throws Exception {
        when(authenticationService.register(any(User.class))).thenAnswer(invocation -> user);
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@example.com\",\"password\":\"password123\",\"role\":\"PROFESSEUR\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.role").value("PROFESSEUR"));

        verify(authenticationService, times(1)).register(any(User.class));
    }
    /**
     * Test de l'authentification
     */
    @Test
    public void testAuthenticate() throws Exception {
        when(authenticationService.authenticate(any(AuthenticationRequest.class))).thenReturn(authenticationResponse);

        mockMvc.perform(post("/api/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@example.com\",\"password\":\"password123\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("fake-jwt-token"));

        verify(authenticationService, times(1)).authenticate(any(AuthenticationRequest.class));
    }

    /**
     * Test de l'inscription d'un professeur
     */
    @Test
    public void testRegisterProfesseur() throws Exception {
        when(authenticationService.registerProfesseur(any(Professeur.class))).thenReturn(professeur);

        mockMvc.perform(post("/api/auth/registerProf")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"cin\":\"ABC123\",\"code\":\"PROF001\",\"nom\":\"Dupont\",\"prenom\":\"Jean\",\"adresse\":\"adresse inconnu\",\"numTele\":\"0265445\",\"user\":{\"email\":\"prof@example.com\",\"password\":\"securePass\",\"role\":\"PROFESSEUR\"}}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.cin").value("ABC123"))
                .andExpect(jsonPath("$.code").value("PROF001"))
                .andExpect(jsonPath("$.nom").value("Dupont"))
                .andExpect(jsonPath("$.prenom").value("Jean"))
                .andExpect(jsonPath("$.adresse").value("adresse inconnu"))
                .andExpect(jsonPath("$.numTele").value("0265445"))
                .andExpect(jsonPath("$.user.email").value("prof@example.com"))
                .andExpect(jsonPath("$.user.role").value("PROFESSEUR"));

        verify(authenticationService, times(1)).registerProfesseur(any(Professeur.class));
    }
}
