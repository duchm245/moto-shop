package com.motoshop.services.impl;

import com.motoshop.mapper.NotificationMapper;
import com.motoshop.models.Notification;
import com.motoshop.repositories.NotificationRepository;
import com.motoshop.services.NotificationService;
import com.motoshop.web.dto.response.NotificationResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;

    private final NotificationMapper notificationMapper;


    public NotificationServiceImpl(NotificationRepository notificationRepository, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
    }

    @Override
    public List<NotificationResponse> loadNotification() {
        List<Notification> notifications = notificationRepository.getNotificationByIsReadEqualsAndDeliverStatusEquals(false, true);
        return notifications.stream()
                .map(notificationMapper::mapToResponse)
                .toList();
    }

    @Override
    public NotificationResponse modifyNotification(Long id) {
        Notification notification = notificationRepository.findById(id).get();
        notification.setIsRead(true);
        notification.setDeliverStatus(true);
        notificationRepository.save(notification);
        return notificationMapper.mapToResponse(notification);
    }

    @Override
    public void updateNotification(Long id) {
        Notification notification = notificationRepository.findById(id).orElseThrow();
        notificationRepository.save(notification);
    }

    @Override
    public void createNotification(Notification notification) {
        notificationMapper.mapToResponse(notificationRepository.save(notification));
    }
    @Override
    public List<NotificationResponse> pushNotification() {
        List<Notification> notifications = notificationRepository.getNotificationByIsReadEqualsAndDeliverStatusEquals(false, false);
        for (Notification n : notifications) {
            n.setDeliverStatus(true);
            notificationRepository.save(n);
        }
        return notifications.stream()
                .map(notificationMapper::mapToResponse)
                .toList();
    }
}
