package com.ssafy.gambti.domain.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserGender {

    MALE("남자"),
    FEMALE("여자");

    private String description;

}
