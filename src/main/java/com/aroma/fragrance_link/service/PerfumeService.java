package com.aroma.fragrance_link.service;

import com.aroma.fragrance_link.entity.Perfume;
import com.aroma.fragrance_link.repository.impl.PerfumeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class PerfumeService {
    private final PerfumeRepository perfumeRepository;

    public PerfumeService(PerfumeRepository perfumeRepository) {
        this.perfumeRepository = perfumeRepository;
    }

    public Perfume createPerfume(Perfume perfume) {
        return perfumeRepository.save(perfume);
    }

    public List<Perfume> getAllPerfumes() {
        return perfumeRepository.findAll();
    }

    public Perfume getPerfumeById(Long id) {
        return perfumeRepository.findById(id);
    }

    public Perfume updatePerfume(Perfume perfume) {
        return perfumeRepository.update(perfume);
    }

    public void deletePerfume(Perfume perfume) {
        perfumeRepository.delete(perfume);
    }
}

