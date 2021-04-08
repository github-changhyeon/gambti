package com.ssafy.gambti.service.user;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.messaging.Notification;
import com.ssafy.gambti.domain.mapping.Friend;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.domain.user.UserBanFriend;
import com.ssafy.gambti.domain.user.UserMBTI;
import com.ssafy.gambti.dto.NotificationDto;
import com.ssafy.gambti.dto.user.FireStoreFriendRes;
import com.ssafy.gambti.dto.user.UserIdListRes;
import com.ssafy.gambti.repository.user.FriendRepository;
import com.ssafy.gambti.repository.user.UserBanFriendRepository;
import com.ssafy.gambti.repository.user.UserRepository;
import com.ssafy.gambti.service.caching.CachingService;
import com.ssafy.gambti.service.security.SecurityService;
import com.ssafy.gambti.utils.NotificationUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {

    private static final Logger logger = LoggerFactory.getLogger(FriendService.class);

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final UserBanFriendRepository userBanFriendRepository;
    private final SecurityService securityService;
    private final CachingService cachingService;
    private final NotificationUtils notificationUtils;

    // 현재 로그인한 유저의 토큰을 디코딩하여 로그인 유저 객체를 가져오는 getter
    public User getLoginUser(HttpServletRequest httpServletRequest){
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;

        User loginUser = null;

        try {
            if(token!=null){
                //2.1 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //2.2 uid를 가지고온다.
                String loginUserId = decodedToken.getUid();
                //2.3 각각의 userId로 객체를 할당한다.
//                fromUser = userRepository.findUserById(fromUserId);
                loginUser = userRepository.findById(loginUserId).get();
            }
        }
        // 3. 중간에 애러났으면 false
        catch (FirebaseAuthException e){
            logger.error("Firebase Exception : ", e.getLocalizedMessage());
        }

        return loginUser;
    }

    public boolean addFriend(String toUserId, HttpServletRequest httpServletRequest) {

        // 1. 친구 관계를 요청/수락 할 두 유저 객체를 가져온다. fromUser(로그인 유저), toUser(친구 요청/수락 대상)
        User fromUser = getLoginUser(httpServletRequest);
        User toUser = userRepository.findById(toUserId).get();

        // 이미 친구요청을 보낸 적이 있으면 예외처리
        friendRepository.findByFromAndTo(fromUser, toUser).ifPresent(
                m -> {
                    throw new IllegalStateException("이미 친구요청을 보낸 회원입니다.");
                }
        );

        // FireStore에서 필요한 데이터들을 초기화 한다.
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference usersRef = db.collection("users");
        DocumentReference toUsersRef = usersRef.document(toUserId);
        DocumentReference fromUsersRef = usersRef.document(fromUser.getId());
        ApiFuture<DocumentSnapshot> toUserSnapShot = toUsersRef.get();

        // 2. 이전에 toUser(상대방)이 나에게 친구요청을 한적이 있는지 확인한다.
        // 만약 있다면, 친구 수락을 해줘야 하는 요청이기때문에 isApproved 변수를 둘다 true로 만들어 줘야 한다.
        Optional<Friend> previousRequest = friendRepository.findByFromAndTo(toUser, fromUser);

        // 3. fromUser와 toUser가 존재한다면 친구 요청 또는 수락을 할것임
        if (fromUser != null && toUser != null) {
            // FireStore users-{toUserId}-notification 컬렉션에 다음 필드를 가지는 document 추가
            // 아래에서 notificationDto에 message와 url을 setting 하고 save 할 것임
            NotificationDto notificationDto = NotificationDto.builder()
                    .receiverUid(toUser.getId())
                    .senderUid(fromUser.getId())
                    .type("friend").build();

            // 3.1 이전에 상대방이 나에게 친구 요청을 한 내역이 있다면 친구 수락을 해야함
            if (previousRequest.isPresent()) {
                // 3.1.1 이전에 보낸 친구 요청의 승인 상태를 true로 바꾼다.
                previousRequest.get().changeApproved();

                // 3.1.2현재 보낸 친구 요청의 승인 상태를 만든다. isApproved는 현재 서로 승인상태이기 때문에 true
                Friend friend = Friend.builder()
                        .from(fromUser)
                        .to(toUser)
                        .isApproved(true)
                        .build();

                friendRepository.save(friend);

                // 친구 관계 확인을 위해 users COL - {uid DOC} - friends COL - {친구 uid} DOC - status FIELD 를 fromUser toUser 모두 2로 바꾼다.
                fromUsersRef.collection("friends").document(toUser.getId()).update("status", 2);
                toUsersRef.collection("friends").document(fromUser.getId()).update("status", 2);

                // notificationDto의 메세지 설정
                notificationDto.setMessage(fromUser.getNickname()+"님께서 친구요청을 수락하셨습니다.");

            // 3.2 이전에 상대방이 나에게 친구 요청을 한 내역이 없다면 친구 요청을 해야함
            } else {
                // 3.2.1 한쪽 유저에서 처음 보낸 친구 요청이라면 상대방에서 아직 승인을 하지 않았기 때문에 isApproved는 false
                Friend friend = Friend.builder()
                        .from(fromUser)
                        .to(toUser)
                        .isApproved(false)
                        .build();

                friendRepository.save(friend);

                // FireStore에서 fromUser의 users-{fromUserid}-friends에 toUser를 친구 요청 대기자로(code:0) 추가해야함
                // FireStore에서 toUser의 users-{toUserid}-friends에 fromUser를 친구 요청자 (code:1) 추가해야함
//                fromUsersRef.update("friends", FieldValue.arrayUnion(new FireStoreFriendRes(toUserId, 0)));
//                toUsersRef.update("friends", FieldValue.arrayUnion(new FireStoreFriendRes(fromUser.getId(), 1)));
                // // 친구 관계 확인을 위해 users COL - {uid DOC} - friends COL - {친구 uid} DOC - status FIELD 를 fromUser는 0 toUser는 1로 초기화 한다.
                Map<String, Object> senderStatus = new HashMap<>();
                Map<String, Object> receiverStatus = new HashMap<>();

                senderStatus.put("status", 0);
                receiverStatus.put("status", 1);

                fromUsersRef.collection("friends").document(toUser.getId()).set(senderStatus);
                toUsersRef.collection("friends").document(fromUser.getId()).set(receiverStatus);

                // notificationDto의 메세지 및 url(노티에서 친구요청을 바로 할수 있도록 url) 설정
                notificationDto.setMessage(fromUser.getNickname()+"님께서 친구요청을 하셨습니다.");
                notificationDto.setUrl("http://localhost:8081/v1/friends/"+fromUser.getId());

            }
            // FireStore users-{toUserId}-notification 컬렉션 하위에 노티에 관한 내용을 담는 notificationDto 저장
            notificationUtils.registNotification(notificationDto);

            // 4. toUser에게 background 메세지 보내기
            Notification notification = Notification.builder()
                    .setBody(fromUser.getNickname()+"님에게서 새로운 알림이 왔습니다.")
                    .setImage("images/gambti/gambti_icon.png")
                    .setTitle("GAMBTI의 새로운 알림").build();

            try {
                DocumentSnapshot document = toUserSnapShot.get();
                // 4.1. toUserFcmToken 가져오기
                String fcmToken = document.getData().get("fcmToken").toString();
                // 4.2. 메세지 보내기
                notificationUtils.send(fcmToken, notification);
            } catch (InterruptedException e) {
                logger.error(e.getMessage());
            } catch (ExecutionException e) {
               logger.error(e.getMessage());
            }
        } else {
            return false;
        }
        return true;
    }

    public boolean deleteFriend(String toUserId, HttpServletRequest httpServletRequest) {
        // 1. 친구 관계를 삭제할 두 유저 객체를 가져온다. fromUser(로그인 유저), toUser(친구 삭제 대상)
        User loginUser = getLoginUser(httpServletRequest);
        User toUser = userRepository.findById(toUserId).get();

        // 2. 현재 서로 친구관계여야 친구 삭제를 할 수 있으므로 서로가 친구 요청/수락 한 내역이 있는지 확인한다.
        Optional<Friend> fromUsetRequest = friendRepository.findByFromAndTo(loginUser, toUser);
        Optional<Friend> toUsetRequest = friendRepository.findByFromAndTo(toUser, loginUser);

        // 3. 서로에게 요청한 친구 요청 내역이 있다면 친구관계를 삭제한다.
        if (fromUsetRequest.isPresent() && toUsetRequest.isPresent()) {
            // 4. 친구 관계 내역을 모두 삭제한다.
            // 즉, fromUser, toUser 중 한명이라도 친구 관계를 삭제하면 서로에게서 친구로 보이지 않는다. (LOL에서 친구관계처럼)
            friendRepository.deleteById(fromUsetRequest.get().getId());
            friendRepository.deleteById(toUsetRequest.get().getId());
        } else {
            return false;
        }
        return true;
    }

    public UserIdListRes recommendFriends(HttpServletRequest httpServletRequest) {
        // 1. 현재 로그인 유저 객체 생성
        User loginUser = getLoginUser(httpServletRequest);

        // 2. 현재 유저와 현재 유저의 친구들, 현재 유저가 ban한 유저까지 추천 친구에서 제외하고 보여주기위한 리스트(exclusiveUsers) 생성
        // 2.1 현재 유저가 친구 요청한 사람 또는 친구관계인 사람 exclusiveUsers에 추가
        Set<User> exclusiveUsers = friendRepository.findByFrom(loginUser).stream()
                .map(friend -> {
                    return friend.getTo();
                })
                .collect(Collectors.toSet());

        // 2.2 현재 유저에게 친구 요청을 보낸 사람 exclusiveUsers에 추가
        exclusiveUsers.addAll(friendRepository.findByToAndIsApproved(loginUser, false).stream()
                .map(friend -> {
                    return friend.getTo();
                })
                .collect(Collectors.toSet()));

        // 2.3 현재 유저 exclusiveUsers에 추가
        exclusiveUsers.add(loginUser);

        // 2.4 현재 유저가 ban한 유저 exclusiveUsers에 추가
        userBanFriendRepository.findByFrom(loginUser).stream()
                .filter(userBanFriend -> userBanFriend.getFrom().equals(loginUser))
                .forEach(userBanFriend -> {
                    if (!exclusiveUsers.contains(userBanFriend.getTo())) {
                        exclusiveUsers.add(userBanFriend.getTo());
                    }
                });

        // 3. 친구 추천 알고리즘
        // 3.1. cache에서 현재 사용자의 mbti와 궁합이 맞는 mbti 리스트를 가져온다.
        List<UserMBTI> recommendMbtiList = cachingService.recommendMbtiList(loginUser.getMbti().getMbtiType()).stream()
                .map(s -> UserMBTI.valueOf(s)).collect(Collectors.toList());

        // 3.2. recommendUsers에 궁합이 맞는 mbti 유저를 랜덤하게 받아온후 exclusiveUsers에 있는 배제되어야 할 유저를 빼주고 그 크기를 10명으로 제한.
        List<User> recommendUsers = userRepository.findByMbtiIn(recommendMbtiList).stream()
                .filter(user->!exclusiveUsers.contains(user)).limit(10).collect(Collectors.toList());

        // 4. 추천이 필요한 최종 유저리스트를 UserIdListRes 형태로 생성
        UserIdListRes recommendFriends = new UserIdListRes(recommendUsers);

        return recommendFriends;
    }

    public boolean banFriendOfRecommends(String toUserId, HttpServletRequest httpServletRequest) {
        // 1. 현재 로그인한 유저와 추천 친구 리스트에서 삭제(밴)할 toUser 객체를 가져온다.
        User loginUser = getLoginUser(httpServletRequest);
        User toUser = userRepository.findById(toUserId).get();

        // 2.로그인한 유저, 추천친구 리스트에서 삭제할 유저를 가져왔다면
        if (loginUser != null && toUser != null) {
            // 2.1 UserBanFriend 테이블에 저장해 다음부터 추천 받지 않도록 한다.
            UserBanFriend userBanFriend = UserBanFriend.builder()
                    .from(loginUser)
                    .to(toUser)
                    .build();

            userBanFriendRepository.save(userBanFriend);
        } else {
            return false;
        }
        return true;
    }

}
