package com.proj.backend.auth;



import com.proj.backend.Entities.Professeur;
import com.proj.backend.Entities.User;
import com.proj.backend.Repositories.ProfRepository;
import com.proj.backend.Repositories.UserRepository;
import com.proj.backend.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationSercvice {
    private final UserRepository repository;
    private  final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ProfRepository Profrepository;


    public User register(User request) {
      var user = User.builder()
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .role(request.getRole())
              .build();
      repository.save(user);

        return user;
    }
    public Professeur registerProfesseur(Professeur request) {
        // Création de l'utilisateur associé
        User user = User.builder()
                .email(request.getUser().getEmail())
                .password(passwordEncoder.encode(request.getUser().getPassword())) // Encoder le mot de passe
                .role(request.getUser().getRole()) // Assurez-vous que le rôle est défini correctement
                .build();

        // Sauvegarde de l'utilisateur
        repository.save(user);

        // Association de l'utilisateur au professeur
        request.setUser(user);

        // Sauvegarde du professeur
        Profrepository.save(request);

        return request;
    }


    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }




}
