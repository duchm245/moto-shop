package com.motoshop.services;


import com.motoshop.models.Notification;
import com.motoshop.web.dto.response.NotificationResponse;

import java.util.List;

public interface NotificationService {
    List<NotificationResponse> loadNotification();
    NotificationResponse modifyNotification(Long id);
    void updateNotification(Long id);
    List<NotificationResponse> pushNotification();
    void createNotification(Notification notification);
}
