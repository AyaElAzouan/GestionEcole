package com.proj.backend.Services;






import com.proj.backend.Entities.Professeur;
import com.proj.backend.Repositories.ProfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfServiceImpl implements ProfService{
    @Autowired
    private ProfRepository profRepository;

    @Override
    public List<Professeur> findAll() {
        return profRepository.findAll();
    }

    @Override
    public Professeur findById(Long id) {
        return profRepository.findById(id).orElse(null);
    }

  @Override
    public void save(Professeur professeur) {
        profRepository.save(professeur);
    }

    @Override
    public void deleteById(Long id) {
        profRepository.deleteById(id);
    }


}
