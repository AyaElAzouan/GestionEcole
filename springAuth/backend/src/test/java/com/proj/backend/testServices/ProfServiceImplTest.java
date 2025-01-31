package com.proj.backend.testServices;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.proj.backend.Entities.Professeur;
import com.proj.backend.Repositories.ProfRepository;
import com.proj.backend.Services.ProfServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ProfServiceImplTest {

    @Mock
    private ProfRepository profRepository; // Simule le repository

    @InjectMocks
    private ProfServiceImpl profService; // Service à tester

    private Professeur prof1;
    private Professeur prof2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialise les mocks
        prof1 = new Professeur();
        prof1.setId(1L);
        prof1.setCin("AB123456");
        prof1.setCode("P001");
        prof1.setNom("Dupont");
        prof1.setPrenom("Jean");

        prof2 = new Professeur();
        prof2.setId(2L);
        prof2.setCin("CD789012");
        prof2.setCode("P002");
        prof2.setNom("Martin");
        prof2.setPrenom("Sophie");
    }

    @Test
    void testFindAll() {
        when(profRepository.findAll()).thenReturn(Arrays.asList(prof1, prof2));

        List<Professeur> result = profService.findAll();

        assertEquals(2, result.size());
        assertEquals("Dupont", result.get(0).getNom());
        assertEquals("Martin", result.get(1).getNom());
    }

    @Test
    void testFindById_Exists() {
        when(profRepository.findById(1L)).thenReturn(Optional.of(prof1));

        Professeur result = profService.findById(1L);

        assertNotNull(result);
        assertEquals("Dupont", result.getNom());
    }

    @Test
    void testFindById_NotExists() {
        when(profRepository.findById(99L)).thenReturn(Optional.empty());

        Professeur result = profService.findById(99L);

        assertNull(result);
    }

    @Test
    void testSave() {
        profService.save(prof1);

        verify(profRepository, times(1)).save(prof1);
    }

    @Test
    void testDeleteById() {
        profService.deleteById(1L);

        verify(profRepository, times(1)).deleteById(1L);
    }
}
