package ensat.elhaddad.sudentservice.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String cin;
    @Column(nullable = false, unique = true)
    private String cne;
    private String nom;
    private String prenom;
    private String email;
    private String adresse;
    private String numTele;
    private Date dateNAissance;

    @ElementCollection
    private List<Long> matieres;

}
