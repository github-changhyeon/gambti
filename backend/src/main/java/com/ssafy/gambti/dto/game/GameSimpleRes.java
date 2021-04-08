package com.ssafy.gambti.dto.game;

import com.ssafy.gambti.domain.game.Game;
import lombok.Builder;
import lombok.Getter;

@Getter
public class GameSimpleRes {

    private Long gameId;
    private String appName;
    private Long metascore;
    private Long price;
    private String sentiment;
    private String logoImagePath;
    private String backgroundImagePath;
    private String videoUrl;
    private boolean isJoined;
    private boolean isOwned;
    private int joinUserCount;

    @Builder
    public GameSimpleRes(Long gameId, String appName, String logoImagePath, String backgroundImagePath, String videoUrl) {
        this.gameId = gameId;
        this.appName = appName;
        this.logoImagePath = logoImagePath;
        this.backgroundImagePath = backgroundImagePath;
        this.videoUrl = videoUrl;
    }

    public GameSimpleRes(Game game){
        this.gameId = game.getId();
        this.appName = game.getAppName();
        this.metascore = game.getMetascore();
        this.price = game.getPrice();
        this.sentiment = game.getSentiment();
        this.logoImagePath = game.getLogoImagePath();
        this.backgroundImagePath = game.getBackgroundImagePath();
        this.videoUrl = game.getVideoUrl();
    }

    public void setJoinUserCount(int joinUserCount) {
        this.joinUserCount = joinUserCount;
    }

    public void setOwned(boolean owned) {
        isOwned = owned;
    }

    public void setJoined(boolean joined) {
        isJoined = joined;
    }
}