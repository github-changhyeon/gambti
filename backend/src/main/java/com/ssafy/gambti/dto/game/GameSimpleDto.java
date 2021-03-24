package com.ssafy.gambti.dto.game;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class GameSimpleDto {

    private Long gameId;
    private String appName;
    private Long metascore;
    private Long price;
    private String sentiment;
    private String logoImagePath;
    private String backgoundImagePath;
    private boolean isJoined;
    private boolean isOwned;
    private int joinUserCount;

}