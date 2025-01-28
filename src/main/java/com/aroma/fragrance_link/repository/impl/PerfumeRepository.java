package com.aroma.fragrance_link.repository.impl;

import com.aroma.fragrance_link.entity.Perfume;
import com.aroma.fragrance_link.repository.AbstractJpaRepository;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class PerfumeRepository extends AbstractJpaRepository<Perfume, Long> {
    public PerfumeRepository(EntityManager entityManager) {
        super(Perfume.class, entityManager);
    }
}

