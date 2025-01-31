package ensat.elhaddad.sudentservice.testService;

import ensat.elhaddad.sudentservice.Entities.Etudiant;
import ensat.elhaddad.sudentservice.Repositories.EtudiantRepository;
import ensat.elhaddad.sudentservice.Services.EtudiantServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EtudiantServiceImplTest {
    @Mock
    private EtudiantRepository etuRepository; // Simule le repository

    @InjectMocks
    private EtudiantServiceImpl etuService; // Service à tester

    private Etudiant etu1;
    private Etudiant etu2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialise les mocks
        etu1 = new Etudiant();
        etu1.setId(1L);
        etu1.setCin("AB123456");
        etu1.setCne("P001");
        etu1.setNom("Dupont");
        etu1.setPrenom("Jean");


        etu2 = new Etudiant();
        etu2.setId(2L);
        etu2.setCin("CD789012");
        etu2.setCne("P002");
        etu2.setNom("Martin");
        etu2.setPrenom("Sophie");
    }

    @Test
    void testFindAll() {
        when(etuRepository.findAll()).thenReturn(Arrays.asList(etu1, etu2));

        List<Etudiant> result = etuService.findAll();

        assertEquals(2, result.size());
        assertEquals("Dupont", result.get(0).getNom());
        assertEquals("Martin", result.get(1).getNom());
    }

    @Test
    void testFindById_Exists() {
        when(etuRepository.findById(1L)).thenReturn(Optional.of(etu1));

        Etudiant result = etuService.findById(1L);

        assertNotNull(result);
        assertEquals("Dupont", result.getNom());
    }

    @Test
    void testFindById_NotExists() {
        when(etuRepository.findById(99L)).thenReturn(Optional.empty());

        Etudiant result = etuService.findById(99L);

        assertNull(result);
    }

    @Test
    void testSave() {
        etuService.save(etu1);

        verify(etuRepository, times(1)).save(etu1);
    }

    @Test
    void testDeleteById() {
        etuService.deleteById(1L);

        verify(etuRepository, times(1)).deleteById(1L);
    }
}
