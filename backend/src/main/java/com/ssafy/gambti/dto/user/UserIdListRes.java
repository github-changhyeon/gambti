package com.ssafy.gambti.dto.user;

import com.ssafy.gambti.domain.user.User;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserIdListRes {

    private List<String> userIds;

    public UserIdListRes(List<User> users) {
        this.userIds = users.stream().map(user->user.getId()).collect(Collectors.toList());
    }

    public void changeUserIds(List<String> userIds) {
        this.userIds = userIds;
    }

}
