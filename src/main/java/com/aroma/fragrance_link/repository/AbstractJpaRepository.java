package com.aroma.fragrance_link.repository;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import java.util.List;

public abstract class AbstractJpaRepository<T, ID> {

    private final Class<T> entityClass;
    protected final EntityManager entityManager;

    public AbstractJpaRepository(Class<T> entityClass, EntityManager entityManager) {
        this.entityClass = entityClass;
        this.entityManager = entityManager;
    }

    @Transactional
    public T save(T entity) {
        entityManager.persist(entity);
        return entity;
    }

    public T findById(ID id) {
        return entityManager.find(entityClass, id);
    }

    public List<T> findAll() {
        return entityManager.createQuery("FROM " + entityClass.getSimpleName(), entityClass).getResultList();
    }

    @Transactional
    public T update(T entity) {
        return entityManager.merge(entity);
    }

    @Transactional
    public void delete(T entity) {
        entityManager.remove(entity);
    }
}

