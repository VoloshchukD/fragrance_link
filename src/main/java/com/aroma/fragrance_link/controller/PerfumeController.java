package com.aroma.fragrance_link.controller;

import com.aroma.fragrance_link.entity.Perfume;
import com.aroma.fragrance_link.service.PerfumeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/perfumes")
public class PerfumeController {
    private final PerfumeService perfumeService;

    public PerfumeController(PerfumeService perfumeService) {
        this.perfumeService = perfumeService;
    }

    @PostMapping
    public Perfume createPerfume(@RequestBody Perfume perfume) {
        return perfumeService.createPerfume(perfume);
    }

    @GetMapping
    public List<Perfume> getAllPerfumes() {
        return perfumeService.getAllPerfumes();
    }

    @GetMapping("/{id}")
    public Perfume getPerfumeById(@PathVariable Long id) {
        return perfumeService.getPerfumeById(id);
    }

    @PutMapping
    public Perfume updatePerfume(@RequestBody Perfume perfume) {
        return perfumeService.updatePerfume(perfume);
    }

    @DeleteMapping("/{id}")
    public void deletePerfume(@PathVariable Long id) {
        Perfume perfume = perfumeService.getPerfumeById(id);
        perfumeService.deletePerfume(perfume);
    }
}
