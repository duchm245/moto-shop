package com.motoshop.repositories;

import com.motoshop.models.Color;
import com.motoshop.models.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {
    List<Size> findByColorId(long colorId);

    Size findByValueAndColorId(String value, long colorId);

    List<Size> findByColor(Color color);

    @Query("SELECT DISTINCT s.value FROM Size s")
    List<String> findDistinctSizeValues();
}
