package com.example.inscriptionservice.testServices;


import com.example.inscriptionservice.Entities.Inscription;
import com.example.inscriptionservice.Repositories.InscriptionRepository;
import com.example.inscriptionservice.Services.InscriptionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class InscriptionServiceTest {
    @InjectMocks
    private InscriptionServiceImpl inscriptionService;

    @Mock
    private InscriptionRepository inscriptionRepository;

    private Inscription inscription;

    @BeforeEach
    void setUp() {
        inscription = new Inscription();
        inscription.setId(1L);
        inscription.setEtudiantId(100L);
        inscription.setModuleId(200L);
        inscription.setDateInscription(new Date());
    }

    @Test
    void testFindAll() {
        List<Inscription> inscriptions = Arrays.asList(inscription);
        when(inscriptionRepository.findAll()).thenReturn(inscriptions);

        List<Inscription> result = inscriptionService.findAll();

        assertEquals(1, result.size());
        assertEquals(100L, result.get(0).getEtudiantId());
        verify(inscriptionRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        when(inscriptionRepository.findById(1L)).thenReturn(Optional.of(inscription));

        Inscription result = inscriptionService.findById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(inscriptionRepository, times(1)).findById(1L);
    }

    @Test
    void testSave() {
        inscriptionService.save(inscription);

        assertNotNull(inscription.getDateInscription());
        verify(inscriptionRepository, times(1)).save(inscription);
    }

    @Test
    void testDeleteById() {
        doNothing().when(inscriptionRepository).deleteById(1L);

        inscriptionService.deleteById(1L);

        verify(inscriptionRepository, times(1)).deleteById(1L);
    }

    @Test
    void testFindByEtudiant() {
        List<Inscription> inscriptions = Arrays.asList(inscription);
        when(inscriptionRepository.findByEtudiantId(100L)).thenReturn(inscriptions);

        List<Inscription> result = inscriptionService.findByEtudiant(100L);

        assertEquals(1, result.size());
        assertEquals(100L, result.get(0).getEtudiantId());
        verify(inscriptionRepository, times(1)).findByEtudiantId(100L);
    }

    @Test
    void testGetTotalInscriptions() {
        when(inscriptionRepository.count()).thenReturn(5L);

        long count = inscriptionService.getTotalInscriptions();

        assertEquals(5L, count);
        verify(inscriptionRepository, times(1)).count();
    }

    @Test
    void testGetInscriptionsCountByModule() {
        List<Object[]> mockData = Arrays.asList(new Object[][]{{200L, 3L}});
        when(inscriptionRepository.countInscriptionsByModule()).thenReturn(mockData);

        Map<Long, Long> result = inscriptionService.getInscriptionsCountByModule();

        assertEquals(1, result.size());
        assertEquals(3L, result.get(200L));
        verify(inscriptionRepository, times(1)).countInscriptionsByModule();
    }
}
