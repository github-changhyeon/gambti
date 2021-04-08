package com.ssafy.gambti.utils;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.messaging.*;
import com.ssafy.gambti.dto.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class NotificationUtils {
    private static final Logger logger = LoggerFactory.getLogger(NotificationUtils.class);
    private final FirebaseTokenUtils firebaseTokenUtils;


    //FCM 메세지를 보내는 메서드 입니다.

    //Notification 객체는 만드신 후, 아래 @param과 같이 만들어서 넣어주시면 됩니다.

    //FCM 토큰은 따로 firesotre에서 받아와야 합니다.
    //FCM은 받아야 하는 사람에게 보내면 됩니다.

    /**
     * @param fcmToken : 받는 사람의 FCM 토큰 번호입니다.
     * @param notification :  Notification notification = Notification.builder()
     *                         .setBody("기현님의 새로운 메세지가 왔습니다.")
     *                         .setImage("images/gambti/gambti_icon.png")
     *                         .setTitle("GAMBTI의 새로운 알림").build();
     */
    public boolean send(String fcmToken, Notification notification){

        WebpushFcmOptions webpushFcmOptions = WebpushFcmOptions.builder().setLink("https://gambti.com").build();
        WebpushConfig webpushConfig = WebpushConfig.builder().setFcmOptions(webpushFcmOptions).build();

        Message message = Message.builder()
                .setToken(fcmToken)
                .setWebpushConfig(webpushConfig)
                .setNotification(notification)
                .build();

        try {
            String response = FirebaseMessaging.getInstance().send(message);
           logger.info("Successfully sent message: " + response);
        } catch (FirebaseMessagingException e) {
            logger.error(e.getMessage());
            return false;
        }
        return true;
    }

    //firesotre에 noti를 등록하는 메서드 입니다.
    //상황 1. 일대일 메세지는 받는사람, 보내는 사람에게 보내야합니다.
    //상황 2. 그룹 메세지는 해당 그룹에 포함된 사람에게 모두 보내야합니다.
    //따로 controller를 만들지 않기 때문에 noti가 필요한 부분에서 사용하시면 됩니다.
    public void registNotification(NotificationDto notificationDto){
        Firestore db = FirestoreClient.getFirestore();

        CollectionReference notiRef = db.collection("users").document(notificationDto.getReceiverUid()).collection("notifications");
        Map<String, Object> docData = new HashMap<>();

        docData.put("message", notificationDto.getMessage());
        docData.put("receiverUid",notificationDto.getReceiverUid());
        docData.put("senderUid",notificationDto.getSenderUid());
        docData.put("url",notificationDto.getUrl());
        docData.put("type", notificationDto.getType());
        docData.put("timeStamp", FieldValue.serverTimestamp());
        docData.put("isRead",false);

        notiRef.add(docData);
    }
}
