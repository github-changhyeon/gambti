package com.ssafy.gambti.dto.account;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpRequest {
    private String mbti;
    private String gender;
    private String steamId;
    private int maxPrice;
    private int age;
}
