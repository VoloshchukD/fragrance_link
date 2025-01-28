package com.aroma.fragrance_link.service;

import com.aroma.fragrance_link.entity.Brand;
import com.aroma.fragrance_link.repository.impl.BrandRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class BrandService {
    private final BrandRepository brandRepository;

    public BrandService(BrandRepository brandRepository) {
        this.brandRepository = brandRepository;
    }

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Brand getBrandById(Long id) {
        return brandRepository.findById(id);
    }

    public Brand updateBrand(Brand brand) {
        return brandRepository.update(brand);
    }

    public void deleteBrand(Brand brand) {
        brandRepository.delete(brand);
    }
}

