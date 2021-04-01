package com.ssafy.gambti.dto.chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomRequest {
    private String FriendUid;
    private int maxNumber;
    private String type;
}
