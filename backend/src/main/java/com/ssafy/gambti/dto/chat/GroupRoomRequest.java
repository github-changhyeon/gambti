package com.ssafy.gambti.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupRoomRequest {
    private String type;
    private int maxNumber;
    private String gameName;
}