package com.ssafy.gambti.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationDto {
    private String message;
    private String senderUid;
    private String receiverUid;
    private String type;
    private String url;

    @Builder
    public NotificationDto(String message, String senderUid, String receiverUid, String type, String url) {
        this.message = message;
        this.senderUid = senderUid;
        this.receiverUid = receiverUid;
        this.type = type;
        this.url = url;
    }
}
