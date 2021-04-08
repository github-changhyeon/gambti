package com.ssafy.gambti.dto.account;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ModifyUserInfoRequest {
    private String nickname;
}
