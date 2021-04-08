package com.ssafy.gambti.dto.game;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigInteger;

@Getter
@Builder
public class GameRecommendRes {
    private Long gameId;
    private String appName;
    private String logoImagePath;
    private String backgroundImagePath;
    private String videoUrl;
    private boolean isJoined;
    private boolean isOwned;
    private int joinUserCount;
    private double rating;
}
