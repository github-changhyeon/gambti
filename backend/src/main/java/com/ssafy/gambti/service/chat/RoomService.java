package com.ssafy.gambti.service.chat;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.dto.chat.GroupRoomRequest;
import com.ssafy.gambti.dto.chat.RoomRequest;
import com.ssafy.gambti.repository.user.UserRepository;
import com.ssafy.gambti.service.caching.CachingService;
import com.ssafy.gambti.utils.FirebaseTokenUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class RoomService {
    private static final Logger logger = LoggerFactory.getLogger(RoomService.class);

    private final FirebaseTokenUtils firebaseTokenUtils;
    private final CachingService cachingService;
    private final UserRepository userRepository;

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
                        docData.put("roomId", uuid);
                        docData.put("roomName", roomRequest.getRoomName());
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
        return uuid;
    }
    public String getGroupRoom(GroupRoomRequest groupRoomRequest, HttpServletRequest httpServletRequest){

        if(groupRoomRequest.getType().equals("Group")) {
            String uuid = UUID.randomUUID().toString();
            Firestore db = FirestoreClient.getFirestore();

            FirebaseToken decodedToken = firebaseTokenUtils.decodedToken(httpServletRequest);
            Optional<User> user = null;
            String myUid = decodedToken.getUid();
            String myMbti = null;
            String myNickname = null;
            String selectedRoomId = null;
            String selectedRoomName = null;
            long selectedRoomCnt = 0;
            int sumOfindex = 0;
            double maxScore = -1;
            Query query;
            //최우선적으로 내가 해당게임의 그룹방에 포함되어 있는지 확인한다.
            for(int i = 1; i<5; i++) {
                query = db.collection("rooms")
                        .whereEqualTo("type", "Group")
                        .whereEqualTo("gameName", groupRoomRequest.getGameName())
                        .whereEqualTo("users."+i, myUid);
                ApiFuture<QuerySnapshot> querySnapshot = query.get();
                try {
                    if(querySnapshot.get().getDocuments().size()!=0) {
                        logger.info("너는 이미 이 게임에 해당하는 room을 가지고 있어!");
                        selectedRoomId = querySnapshot.get().getDocuments().get(0).getId();
                        return selectedRoomId;
                    }
                } catch (InterruptedException e) {
                    e.printStackTrace();
                } catch (ExecutionException e) {
                    e.printStackTrace();
                }
            }


            DocumentReference myRef = db.collection("users").document(myUid);
            try {
                //mbti를 구한다.
                DocumentSnapshot myDoc = myRef.get().get();
                if (myDoc.exists()) {
                    myMbti = myDoc.getData().get("mbti").toString();
                    myNickname = myDoc.getData().get("nickname").toString();
                    logger.info("요청자 MBTI는 : "+ myMbti);
                    List<String> compatibilityOfMbti = cachingService.recommendMbtiAll(myMbti);

                    //해당 게임 room list 받아오기
                    CollectionReference roomsRef = db.collection("rooms");
                    ApiFuture<QuerySnapshot> future = roomsRef.whereEqualTo("gameName",groupRoomRequest.getGameName()).get();
                    List<QueryDocumentSnapshot> roomList = future.get().getDocuments();

                    //해당 게임의 group room이 존재할 때
                    if(roomList.size()!=0) {
                        for (DocumentSnapshot room : roomList) {

                            //룸 유저 리스트를 받아온다.
                            Map<String, Object> roomUsers = (HashMap<String, Object>) room.get("users");
                            List<Object> roomUsersValue = new ArrayList<>(roomUsers.values());

                            //만약에 room이 꽉 차있으면 다음 방을 검색한다.
                            if ((long)room.get("currentCnt") < 4) {
                                //해당방 유저 리스트를 받은 후, 각 유저의 mbti를 찾는다.
                                for (Object uid : roomUsersValue) {
                                    user = userRepository.findById(uid.toString());
                                    if (user.isPresent()) {
                                        //mbti를 찾았으면 나의 mbti와 궁합도를 구한다.
                                        sumOfindex += compatibilityOfMbti.indexOf(user.get().getMbti().toString());
                                    }
                                }

                                //해당 room의 궁합도 점수를 산출한다.
                                // 방에 있는 유저 수 * 100점 - 각 유저의 MBTI * 100/16 = 6.25
                                double score = (long)room.get("currentCnt") * 100 - sumOfindex * 6.25;
                                logger.info("방에 대한 최종 점수는 ? : " + score);

                                //50점이 넘어야하며 선택된 방보다 더 크면 선택된 방을 바꾼다.
                                if (score > 50.0 && score > maxScore) {
                                    maxScore = score;
                                    selectedRoomId = (String) room.get("roomId");
                                    selectedRoomCnt = (Long) room.get("currentCnt");
                                    selectedRoomName = (String) room.get("roomName");
                                    logger.info("선택된 방은 : " + selectedRoomId);
                                }
                            }
                        }
                        //방에 유저를 넣는다. maxScore가 0점이면 선택된 방이 없다는 이야기
                        if(maxScore>=50) {
                            logger.info("50점이 넘어서 방에 참가했다.");
                            Map<String, Object> update = new HashMap<>();
                            Map<String, String> users = new HashMap<>();
                            users.put(Long.toString(selectedRoomCnt + 1), myUid);

                            update.put("users", users);
                            update.put("roomName", selectedRoomName + "_" + myNickname);
                            update.put("currentCnt", selectedRoomCnt + 1);
                            roomsRef.document(selectedRoomId).set(update, SetOptions.merge());
                            return selectedRoomId;
                        }
                    }
                    //조건에 부합하는 방이 없다면 해당 게임의 room을 만든다.
                    //방이 없다면 rooms 컬렉션에 해당 방을 등록한다.
                    logger.info("50점 미만이라서 새로운 방을 만들었다.");
                    Map<String, Object> docData = new HashMap<>();
                    docData.put("lastMessageText", "");
                    docData.put("roomId", uuid);
                    docData.put("roomName", myNickname);
                    docData.put("currentCnt", 1);
                    docData.put("gameName", groupRoomRequest.getGameName());
                    docData.put("max", groupRoomRequest.getMaxNumber());
                    docData.put("type", groupRoomRequest.getType());

                    Map<String, Object> usersData = new HashMap<>();
                    usersData.put("1", myUid);

                    docData.put("users", usersData);
                    docData.put("timestamp", FieldValue.serverTimestamp());
                    roomsRef.document(uuid).set(docData);

                    //유저 데이터에 방 목록을 넣는다.
                    DocumentReference usersRef = db.collection("users").document(myUid);
                    usersRef.update("rooms", FieldValue.arrayUnion(uuid));
                } else {
                    return null;
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            return uuid;
        }
        else{
            return null;
        }
    }
}
