package com.motoshop.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "consult_request")
public class ConsultRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phone;

    @Column
    private String email;

    @Column(length = 1000)
    private String note;

    // Xe quan tâm (có thể null nếu tư vấn chung)
    @Column
    private Long productId;

    @Column
    private String productName;

    // 0 = chưa xử lý, 1 = đã liên hệ, 2 = đã tư vấn xong
    @Column(nullable = false)
    private int status = 0;

    @Column
    private Date createdDate;

    @Column
    private Date updatedDate;

    // Ghi chú nội bộ của nhân viên (không hiển thị cho khách)
    @Column(length = 2000)
    private String staffNote;
}
