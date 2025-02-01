package com.aroma.fragrance_link.controller;

import com.aroma.fragrance_link.entity.Perfume;
import com.aroma.fragrance_link.entity.Views;
import com.aroma.fragrance_link.service.PerfumeService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/perfumes")
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
    @JsonView(Views.PerfumeDetails.class)
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
