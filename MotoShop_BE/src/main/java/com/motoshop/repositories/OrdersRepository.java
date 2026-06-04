package com.motoshop.repositories;

import com.motoshop.models.OrderItem;
import com.motoshop.models.Orders;
import com.motoshop.models.Product;
import com.motoshop.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
    Orders findByUserAndType(long userId, int type);

    Orders findByUserAndType(User user, int type);

    Orders findByCodeOrders(String codeOrders);

    @Query("SELECT COUNT(o) FROM Orders o WHERE (:status IS NULL OR o.status = :status) AND o.type = 1")
    Long countOrdersByStatus(@Param("status") Integer status);

    @Query("SELECT SUM(oi.quantity) FROM OrderItem oi WHERE oi.orders.status = 4")
    Long totalSoldProducts();

    @Query("SELECT o FROM Orders o WHERE o.codeOrders LIKE %:keyword% AND (:status IS NULL OR o.status = :status) " +
            "AND (:isCheckout IS NULL OR o.isCheckout = :isCheckout) " +
            "AND (:startDate IS NULL OR o.modifiedDate >= :startDate) " +
            "AND (:endDate IS NULL OR o.modifiedDate <= :endDate) " +
            "AND o.type = 1")
    Page<Orders> getAllByStatus(@Param("keyword") String keyword,
                                @Param("status") Integer status,
                                @Param("isCheckout") Boolean isCheckout,
                                @Param("startDate") Date startDate,
                                @Param("endDate") Date endDate,
                                Pageable pageable);

    long countByType(int type);

    @Query("SELECT AVG(o.modifiedDate - o.createDate) FROM Orders o WHERE o.status = :status")
    long calculateAverageProcessingTime(@Param("status") int status);

    @Query("SELECT o FROM Orders o WHERE o.codeOrders LIKE %:keyword% AND o.type = 1")
    Page<Orders> findAllByKeyword(@Param("keyword") String keyword, Pageable pageable);

    Orders findByIdAndType(Long orderId, int type);

    List<Orders> findALlByUserAndType(User user, int type);

    @Query("SELECT SUM(oi.quantity * oi.sellPrice) FROM Orders o JOIN o.orderItems oi WHERE o.status = 4")
    Long totalInCome();

    @Query("SELECT COUNT(o) FROM Orders o WHERE (o.status = 1 OR o.status = 2 OR o.status = 3) AND o.type = 1")
    Long totalOrderNoProcess();

    @Query(value = "SELECT oi.product_name, SUM(oi.quantity) as totalQuantity, SUM(oi.sell_price * oi.quantity) as totalRevenue " +
            "FROM order_item oi " +
            "JOIN orders o ON o.id = oi.order_id " +
            "WHERE o.status = 4 " +
            "GROUP BY oi.product_name " +
            "ORDER BY totalQuantity DESC " +
            "LIMIT 5", nativeQuery = true)
    List<Object[]> findTopSellingProducts();

    @Query("SELECT DATE_FORMAT(o.orderDate, '%Y-%m') AS month, o.status, COUNT(o.id) AS orderCount " +
            "FROM Orders o " +
            "WHERE o.status = :status " +
            "AND o.type = 1 " +
            "GROUP BY month, o.status " +
            "ORDER BY month, o.status")
    List<Object[]> findByMonth(@Param("status") int status);
}
