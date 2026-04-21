package com.motoshop.web.admin;

import com.motoshop.helper.ApiResponse;
import com.motoshop.models.Notification;
import com.motoshop.services.ArticleService;
import com.motoshop.services.NotificationService;
import com.motoshop.web.dto.request.ArticleRequest;
import com.motoshop.web.dto.request.ArticleUDRequest;
import com.motoshop.web.dto.response.ArticleResponse;
import com.motoshop.web.dto.response.NotificationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class ANotificationRest {
    private final NotificationService notificationService;

    public ANotificationRest(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping("/load-notification")
    public ResponseEntity<?> loadNotification() {
        List<NotificationResponse> notifications = notificationService.loadNotification();
        if(notifications != null){
            return new ResponseEntity<>(ApiResponse.build(200, true, "thành công", notifications), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(ApiResponse.build(200, false, "Thất bại", "Không có thông báo nào"), HttpStatus.OK);
        }
    }

    @GetMapping("/read-notification")
    public ResponseEntity<?> readNotification(@RequestParam("id") Long id) {

        NotificationResponse notification = notificationService.modifyNotification(id);
        return new ResponseEntity<>(ApiResponse.build(200, true, "thành công", notification), HttpStatus.OK);

    }

//    @GetMapping("/push-notification")
//    public ResponseEntity<?> pushNotification() {
//        List<NotificationResponse> notifications = notificationService.loadNotification(false, false);
//        for (NotificationResponse n : notifications) {
//            n.setDeliverStatus(true);
//            notificationService.updateNotification(n.getId());
//        }
//        return new ResponseEntity<>(ApiResponse.build(201, true, "thành công", notifications), HttpStatus.OK);
//
//    }
    @GetMapping("/push-notification")
    public ResponseEntity<?> pushNotification() {
        List<NotificationResponse> notifications = notificationService.pushNotification();
        if(notifications != null){
            return new ResponseEntity<>(ApiResponse.build(200, true, "thành công", notifications), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(ApiResponse.build(200, false, "Thất bại", "Không có thông báo nào"), HttpStatus.OK);
        }
    }
}
