package com.motoshop.repositories;

import com.motoshop.models.CategoryPolicy;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryPolicyRepository extends JpaRepository<CategoryPolicy, Long> {

	List<CategoryPolicy> findByStatus(int status);

	CategoryPolicy findByStatusAndId(int satatus, long id);

}
