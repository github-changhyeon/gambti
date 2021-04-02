package com.ssafy.gambti.service.chat;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gambti.dto.chat.RoomRequest;
import com.ssafy.gambti.utils.FirebaseTokenUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class RoomService {
    private static final Logger logger = LoggerFactory.getLogger(RoomService.class);

    private final FirebaseTokenUtils firebaseTokenUtils;

    public String getRoom(RoomRequest roomRequest, HttpServletRequest httpServletRequest){
        Firestore db = FirestoreClient.getFirestore();

        String uuid = UUID.randomUUID().toString();
        FirebaseToken decodedToken = firebaseTokenUtils.decodedToken(httpServletRequest);
        String myUid = decodedToken.getUid();
        String friendUid = roomRequest.getFriendUid();
        String roomId = null;
        CollectionReference roomsRef = db.collection("rooms");

        //1:1 채팅인 경우 이미 방이 있는지 확인한다.
        if(roomRequest.getType().equals("OneOnOne")){
            Query query = roomsRef.whereEqualTo("users.1", myUid).whereEqualTo("users.2", friendUid);
            Query query2 = roomsRef.whereEqualTo("users.2", myUid).whereEqualTo("users.1", friendUid);

            ApiFuture<QuerySnapshot> querySnapshot = query.get();
            try {
                if(querySnapshot.get().getDocuments().size()!=0) {
                    logger.info(querySnapshot.get().getDocuments().get(0).getId());
                    roomId = querySnapshot.get().getDocuments().get(0).getId();
                    logger.info(roomId);
                    return roomId;
                }
                else{
                    querySnapshot = query2.get();
                    if(querySnapshot.get().getDocuments().size()!=0){
                        roomId = querySnapshot.get().getDocuments().get(0).getId();
                        logger.info(roomId);
                        return roomId;
                    }
                    else{
                        //방이 없다면 rooms 컬렉션에 해당 방을 등록한다.
                        Map<String, Object> docData = new HashMap<>();
                        docData.put("lastMessageText", "");
                        docData.put("max", roomRequest.getMaxNumber());
                        docData.put("type", roomRequest.getType());

                        Map<String, Object> usersData = new HashMap<>();
                        usersData.put("1", myUid);
                        usersData.put("2", friendUid);

                        docData.put("users", usersData);
                        docData.put("timestamp", FieldValue.serverTimestamp());
                        roomsRef.document(uuid).set(docData);

                        //유저 데이터에 방 목록을 넣는다.
                        DocumentReference usersRef = db.collection("users").document(myUid);
                        usersRef.update("rooms", FieldValue.arrayUnion(uuid));

                        usersRef = db.collection("users").document(friendUid);
                        usersRef.update("rooms", FieldValue.arrayUnion(uuid));
                    }
                }
            }catch (InterruptedException e) {
                logger.error(e.getMessage());
            } catch (ExecutionException e) {
                logger.error(e.getMessage());
            }
        }
        //TODO : 멀티 채팅방
        else if(roomRequest.getType().equals("multi")){

        }
        return uuid;
    }
}
