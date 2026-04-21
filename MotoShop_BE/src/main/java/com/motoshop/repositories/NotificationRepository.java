package com.motoshop.repositories;

import com.motoshop.models.Notification;
import com.motoshop.web.dto.response.NotificationResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> getNotificationByIsReadEqualsAndDeliverStatusEquals(Boolean isRead, Boolean deliverStatus);
}
