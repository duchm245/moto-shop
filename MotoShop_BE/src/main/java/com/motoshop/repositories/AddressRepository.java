package com.motoshop.repositories;

import com.motoshop.models.Address;
import com.motoshop.models.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUserId(long userId);

}
