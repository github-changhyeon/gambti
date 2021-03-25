package com.ssafy.gambti.dto.game;

import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Setter
public class GameRecommendDto {
    private Long gameId;
    private String appName;
    private String logoImagePath;
    private String backgroundImagePath;
    private String videoUrl;
    private boolean isJoined;
    private boolean isOwned;
    private int joinUserCount;

    public GameRecommendDto(Object [] o){
        this.gameId = ((BigInteger) o[0]).longValue();
        this.appName = (String)o[1];
        this.logoImagePath = (String)o[2];
        this.backgroundImagePath = (String)o[3];
        this.videoUrl = (String)o[4];
    }
}
