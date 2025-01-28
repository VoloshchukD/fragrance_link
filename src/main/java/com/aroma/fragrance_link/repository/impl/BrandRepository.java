package com.aroma.fragrance_link.repository.impl;

import com.aroma.fragrance_link.entity.Brand;
import com.aroma.fragrance_link.repository.AbstractJpaRepository;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class BrandRepository extends AbstractJpaRepository<Brand, Long> {
    public BrandRepository(EntityManager entityManager) {
        super(Brand.class, entityManager);
    }
}

