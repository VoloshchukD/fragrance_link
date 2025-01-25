package com.aroma.fragrance_link;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "perfumes", path = "perfumes")
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
}

