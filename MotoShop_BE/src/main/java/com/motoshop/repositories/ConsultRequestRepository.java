package com.motoshop.repositories;

import com.motoshop.models.ConsultRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultRequestRepository extends JpaRepository<ConsultRequest, Long> {
    Page<ConsultRequest> findByOrderByCreatedDateDesc(Pageable pageable);
    Page<ConsultRequest> findByStatusOrderByCreatedDateDesc(int status, Pageable pageable);
}
