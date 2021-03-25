package com.ssafy.gambti.service.user;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import com.ssafy.gambti.domain.mapping.Friend;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.domain.user.UserBanFriend;
import com.ssafy.gambti.dto.user.UserIdListRes;
import com.ssafy.gambti.repository.user.FriendRepository;
import com.ssafy.gambti.repository.user.UserBanFriendRepository;
import com.ssafy.gambti.repository.user.UserRepository;
import com.ssafy.gambti.service.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FriendService {

    private static final Logger logger = LoggerFactory.getLogger(FriendService.class);

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final UserBanFriendRepository userBanFriendRepository;
    private final SecurityService securityService;

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

        // 2. 이전에 toUser(상대방)이 나에게 친구요청을 한적이 있는지 확인한다.
        // 만약 있다면, 친구 수락을 해줘야 하는 요청이기때문에 isApproved 변수를 둘다 true로 만들어 줘야 한다.
        Optional<Friend> previousRequest = friendRepository.findByFromAndTo(toUser, fromUser);

        // 3. fromUser와 toUser가 존재한다면 친구 요청 또는 수락을 할것임
        if (fromUser != null && toUser != null) {
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
            // 3.2 이전에 상대방이 나에게 친구 요청을 한 내역이 없다면 친구 요청을 해야함
            } else {
                // 3.2.1 한쪽 유저에서 처음 보낸 친구 요청이라면 상대방에서 아직 승인을 하지 않았기 때문에 isApproved는 false
                Friend friend = Friend.builder()
                        .from(fromUser)
                        .to(toUser)
                        .isApproved(false)
                        .build();

                friendRepository.save(friend);
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

        // 2. 현재 유저와 현재 유저의 친구들, 현재 유저가 ban한 유저까지 추천 친구에서 제외하고 보여주기위한 리스트 exclusiveUsers
        // 2.1 현재 유저의 친구 리스트 exclusiveUsers에 추가
        List<User> exclusiveUsers = friendRepository.findByFrom(loginUser).stream()
                .map(friend -> {
                    return friend.getTo();
                })
                .collect(Collectors.toList());

        // 2.2 현재 유저 exclusiveUsers에 추가
        exclusiveUsers.add(loginUser);

        // 2.3 현재 유저가 ban한 유저 exclusiveUsers에 추가
        userBanFriendRepository.findByFrom(loginUser).stream()
                .filter(userBanFriend -> userBanFriend.getFrom().equals(loginUser))
                .forEach(userBanFriend -> {
                    if (!exclusiveUsers.contains(userBanFriend.getTo())) {
                        exclusiveUsers.add(userBanFriend.getTo());
                    }
                });

        // 3. 추천 친구를 저장할 recommendFriends
        List<User> recommendUsers = userRepository.findAll().stream()
                .filter(user->!exclusiveUsers.contains(user)).collect(Collectors.toList());
        UserIdListRes recommendFriends = new UserIdListRes(recommendUsers);

        // TODO: 추천 알고리즘 적용해야함 현재 랜덤으로 섞어서 추천유저 10명 반환

        List<String> recommendUserIds = recommendFriends.getUserIds();
        Collections.shuffle(recommendUserIds);

        int size = recommendUserIds.size();

        if (size < 10) {
            recommendFriends.changeUserIds(recommendUserIds.subList(0, size));
        } else {
            recommendFriends.changeUserIds(recommendUserIds.subList(0, 10));

        }

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
