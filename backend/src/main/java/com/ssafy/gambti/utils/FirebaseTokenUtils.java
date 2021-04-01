package com.ssafy.gambti.utils;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.ssafy.gambti.service.chat.RoomService;
import com.ssafy.gambti.service.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
@RequiredArgsConstructor
public class FirebaseTokenUtils {
    private static final Logger logger = LoggerFactory.getLogger(RoomService.class);
    private final SecurityService securityService;

    public FirebaseToken decodedToken(HttpServletRequest httpServletRequest) {

        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        try {
            decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
        }
        catch (FirebaseAuthException e){
            logger.error("Auth Token Error!",e.getLocalizedMessage());
        }
        return decodedToken;
    }
}
