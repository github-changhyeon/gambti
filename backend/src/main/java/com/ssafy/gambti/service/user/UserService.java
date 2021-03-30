package com.ssafy.gambti.service.user;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.dto.user.UserSimpleRes;
import com.ssafy.gambti.repository.user.FriendRepository;
import com.ssafy.gambti.repository.user.UserRepository;
import com.ssafy.gambti.service.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(FriendService.class);

    private final UserRepository userRepository;
    private final FriendRepository friendRepository;
    private final SecurityService securityService;

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

    public Page<UserSimpleRes> searchUserByNickname(String word, Pageable pageable, HttpServletRequest httpServletRequest) {
        // 1. 현재 로그인한 사용자 객체를 가져온다.
        User loginUser = getLoginUser(httpServletRequest);

        // 2. 검색한 단어에 포함되는 닉네임을 가진 유저를 페이지 처리하여 불러온다.
        Page<User> searchUsers = userRepository.findByNicknameContaining(word, pageable);

        // 3. 2.에서 처리한 모든 유저들과 나와의 현재 관계가 어떤 관계인지 파악하기 위해 각 관계 별로 유저를 리스트로 묶는다.
        // 다음 네 가지의 경우가 있을 수 있음.
        // 서로간 어떤 요청도 없던 경우(0), 친구관계인 경우(1)
        // 내가 친구 요청을 보낸 경우(2), 내가 친구 요청을 받은 경우(3)

        // 3.1 친구 관계인 경우
        List<User> typeOneList = friendRepository.findByFromAndIsApproved(loginUser, true).stream()
                .map( friend ->{return friend.getTo();}
                ).collect(Collectors.toList());

        // 3.2 내가 친구 요청을 보낸 경우
        List<User> typeTwoList = friendRepository.findByFromAndIsApproved(loginUser, false).stream()
                .map( friend ->{return friend.getTo();}
                ).collect(Collectors.toList());

        // 3.3 내가 친구 요청을 받은 경우
        List<User> typeThreeList = friendRepository.findByToAndIsApproved(loginUser, false).stream()
                .map( friend ->{return friend.getFrom();}
                ).collect(Collectors.toList());

        //
        Page<UserSimpleRes> result = searchUsers.map(
                user -> {
                    if (typeOneList.contains(user)) {
                        return new UserSimpleRes(user, 1);
                    } else if (typeTwoList.contains(user)) {
                        return new UserSimpleRes(user, 2);
                    } else if (typeThreeList.contains(user)) {
                        return new UserSimpleRes(user, 3);
                    }
                    return new UserSimpleRes(user, 0);
                }
        );

        return result;

    }
}
