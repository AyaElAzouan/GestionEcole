package com.example.matiereservice.testServices;

import com.example.matiereservice.Entities.Matiere;
import com.example.matiereservice.Repositories.MatiereRepository;
import com.example.matiereservice.Services.MatiereServiceImpl;
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
public class MatiereServiceTest {
    @Mock
    private MatiereRepository matRepository; // Simule le repository

    @InjectMocks
    private MatiereServiceImpl matService; // Service à tester

    private Matiere mat1;
    private Matiere mat2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Initialiser les mocks
        mat1 = new Matiere();
        mat1.setId(1L);
        mat1.setNbrHeure(20);
        mat1.setNom("mat1");
        mat1.setProfId(1L);


        mat2 = new Matiere();
        mat2.setId(2L);
        mat2.setNbrHeure(15);
        mat2.setNom("mat2");
        mat2.setProfId(1L);
    }

    @Test
    void testFindAll() {
        when(matRepository.findAll()).thenReturn(Arrays.asList(mat1, mat2));

        List<Matiere> result = matService.findAll();

        assertEquals(2, result.size());
        assertEquals("mat1", result.get(0).getNom());
        assertEquals("mat2", result.get(1).getNom());
    }

    @Test
    void testFindById_Exists() {
        when(matRepository.findById(1L)).thenReturn(Optional.of(mat1));

        Matiere result = matService.findById(1L);

        assertNotNull(result);
        assertEquals("mat1", result.getNom());
    }

    @Test
    void testFindById_NotExists() {
        when(matRepository.findById(99L)).thenReturn(Optional.empty());

        Matiere result = matService.findById(99L);

        assertNull(result);
    }

    @Test
    void testSave() {
        matService.save(mat1);

        verify(matRepository, times(1)).save(mat1);
    }

    @Test
    void testDeleteById() {
        matService.deleteById(1L);

        verify(matRepository, times(1)).deleteById(1L);
    }
}
