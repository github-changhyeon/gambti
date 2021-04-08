package com.ssafy.gambti.controller.chat;

import com.google.firebase.messaging.Notification;
import com.ssafy.gambti.dto.NotificationDto;
import com.ssafy.gambti.dto.basicResponse.Response;
import com.ssafy.gambti.service.chat.ChatService;
import com.ssafy.gambti.utils.FirebaseTokenUtils;
import com.ssafy.gambti.utils.NotificationUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="Chatting", description = "Chat REST API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "chat")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ChatService chatService;
    private final NotificationUtils notificationUtils;
    private final FirebaseTokenUtils firebaseTokenUtils;

    @PostMapping(value = "/send")
    @Operation(summary = "메세지 쓰기", description = "메세지를 전송한다.")
    public ResponseEntity<? extends Response> sendMessage(@RequestBody NotificationDto notificationDto) {

        notificationUtils.registNotification(notificationDto);

        Notification notification = Notification.builder()
                .setBody("기현님의 새로운 메세지가 왔습니다.")
                .setImage("images/gambti/gambti_icon.png")
                .setTitle("GAMBTI의 새로운 알림").build();

        String fcmToken = "ez7bdmbYry8A4DFBYkYsLW:APA91bH8Koul-s6bOHcEVDLiIuaRDzewbqrmD5j_PLFFwd4-8mLxMEPMovAe0_OFfIFhmvt9QpGxxWNiocmVP0728HdnxkuR4IS0Yo_w9LymbvsxrsnKSh5sK_EM2wbkI3-ykBxO1yUx";
        notificationUtils.send(fcmToken, notification);

        return new ResponseEntity<>(new Response(SUCCESS, "메세지 전송 성공", null), HttpStatus.OK);
    }
}
