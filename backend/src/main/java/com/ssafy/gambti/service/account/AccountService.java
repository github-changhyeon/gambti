package com.ssafy.gambti.service.account;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.ssafy.gambti.domain.user.*;
import com.ssafy.gambti.dto.account.ModifyUserInfoRequest;
import com.ssafy.gambti.dto.account.SignUpRequest;
import com.ssafy.gambti.repository.account.AccountRepository;
import com.ssafy.gambti.repository.tag.TagRepository;
import com.ssafy.gambti.repository.user.UserLikeTagRepository;
import com.ssafy.gambti.service.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;


@Service
@RequiredArgsConstructor
public class AccountService {
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    private final AccountRepository accountRepository;
    private final TagRepository tagRepository;
    private final UserLikeTagRepository userLikeTagRepository;
    private final SecurityService securityService;

    public boolean signIn(){

        return true;
    }

    @Transactional
    public boolean signUp(SignUpRequest signUpRequest, HttpServletRequest httpServletRequest) {
        //1. 토큰을 가지고온다.
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        try {
            if(token!=null){
                //2. 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //3. uid를 가지고온다.
                String uid = decodedToken.getUid();
                //4. SignUpRequest에 담긴 데이터와 uid를 같이 등록한다.
                User signUpUser = User.builder()
                        .id(uid)
                        .mbti(UserMBTI.valueOf(signUpRequest.getMbti()))
                        .nickname(signUpRequest.getNickname())
                        .age(signUpRequest.getAge())
                        .gender(UserGender.valueOf(signUpRequest.getGender()))
                        .maxPrice(signUpRequest.getMaxPrice())
                        .role(UserRole.GUEST) //5. role은 무조건 guest로 설정
                        .build();

                signUpRequest.getUserLikeTagIds().stream()
                        .forEach(aLong -> userLikeTagRepository.save(new UserLikeTag(signUpUser, tagRepository.findById(aLong).get())));

                accountRepository.save(signUpUser);
            }
            else{
                return false;
            }
        }
        //6. 중간에 애러났으면 false
        catch (FirebaseAuthException e){
            logger.error("Firebase Exception : ", e.getLocalizedMessage());
            return false;
        }
        //7. 제대로 등록했으면 true
        return true;
    }

    public boolean withdrawal(HttpServletRequest httpServletRequest) {
        //1. 토큰을 가지고온다.
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        boolean result = false;
        try {
            if(token!=null){
                //2. 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //3. uid를 가지고온다.
                String uid = decodedToken.getUid();
                //4. id에 해당하는 유저 삭제
                result = accountRepository.deleteById(uid) ==1 ? true : false;
            }
            else{
                return false;
            }
        }
        //5. 중간에 애러났으면 false
        catch (FirebaseAuthException e){
            logger.error("Firebase Exception : ", e.getLocalizedMessage());
            return false;
        }
        //6. 제대로 삭제 했으면 true
        return result;
    }

    public boolean modifyUserInfo(ModifyUserInfoRequest modifyUserInfoRequest, HttpServletRequest httpServletRequest) {
        //1. 토큰을 가지고온다.
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        try {
            if(token!=null){
                //2. 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //3. uid를 가지고온다.
                String uid = decodedToken.getUid();
                //4. SignUpRequest에 담긴 데이터와 uid를 같이 등록한다.
                User modifyUser = User.builder()
                        .id(uid)
                        .mbti(UserMBTI.valueOf(modifyUserInfoRequest.getMbti()))
                        .age(modifyUserInfoRequest.getAge())
                        .gender(UserGender.valueOf(modifyUserInfoRequest.getGender()))
                        .maxPrice(modifyUserInfoRequest.getMaxPrice())
                        .steamId(modifyUserInfoRequest.getSteamId())
                        .build();

                accountRepository.save(modifyUser);
            }
            else{
                return false;
            }
        }
        //6. 중간에 애러났으면 false
        catch (FirebaseAuthException e){
            logger.error("Firebase Exception : ", e.getLocalizedMessage());
            return false;
        }
        //7. 제대로 등록했으면 true
        return true;
    }
}
