package com.ssafy.gambti.dto.account;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class SignUpRequest {
    private String nickname;
    private String mbti;
    private String gender;
    private String steamId;
    private int maxPrice;
    private int age;
    private List<Long> userLikeTagIds;
}
