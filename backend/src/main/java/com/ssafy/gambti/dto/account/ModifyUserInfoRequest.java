package com.ssafy.gambti.dto.account;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ModifyUserInfoRequest {
    private int age;
    private String gender;
    private int maxPrice;
    private String mbti;
    private String steamId;
}
