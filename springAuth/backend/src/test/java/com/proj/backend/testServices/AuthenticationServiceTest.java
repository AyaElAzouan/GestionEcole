package com.proj.backend.testServices;

import com.proj.backend.Entities.Professeur;
import com.proj.backend.Repositories.ProfRepository;
import com.proj.backend.Repositories.UserRepository;
import com.proj.backend.auth.AuthenticationRequest;
import com.proj.backend.auth.AuthenticationResponse;
import com.proj.backend.auth.AuthenticationSercvice;
import com.proj.backend.config.JwtService;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;


import com.proj.backend.Entities.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {
    @InjectMocks
    private AuthenticationSercvice authenticationService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProfRepository profRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Mock
    private AuthenticationManager authenticationManager;

    private User user;
    private Professeur professeur;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .email("test@example.com")
                .password("password123")
                .role(Role.PROFESSEUR)
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

    // 🔹 Tester l'inscription d'un utilisateur
    @Test
    void testRegisterUser_Success() {
        when(passwordEncoder.encode(user.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = authenticationService.register(user);

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    // 🔹 Tester l'inscription d'un professeur
    @Test
    void testRegisterProfesseur_Success() {
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(profRepository.save(any(Professeur.class))).thenReturn(professeur);

        Professeur result = authenticationService.registerProfesseur(professeur);

        assertNotNull(result);
        assertEquals("Dupont", result.getNom());
        assertEquals("encodedPassword", result.getUser().getPassword());
        verify(userRepository, times(1)).save(any(User.class));
        verify(profRepository, times(1)).save(any(Professeur.class));
    }

    // 🔹 Tester l'authentification
//    @Test
//    void testAuthenticate_Success() {
//        AuthenticationRequest request = new AuthenticationRequest("test@example.com", "password123");
//
//        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
//        when(jwtService.generateToken(any(User.class))).thenReturn("mocked-jwt-token");
//
//        AuthenticationResponse response = authenticationService.authenticate(request);
//
//        assertNotNull(response);
//        assertEquals("mocked-jwt-token", response.getToken());
//        verify(authenticationManager, times(1))
//                .authenticate(any(UsernamePasswordAuthenticationToken.class));
//        verify(jwtService, times(1)).generateToken(any(User.class));
//    }
}
