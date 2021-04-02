package com.ssafy.gambti.dto.user;

import com.ssafy.gambti.domain.user.User;
import lombok.Getter;

@Getter
public class UserSimpleRes {

    private String userId;

    private int friendStatus;

    public UserSimpleRes(User user, int friendStatus) {
        this.userId = user.getUid();
        this.friendStatus = friendStatus;
    }

}