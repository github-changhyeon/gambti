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
    private String backgoundImagePath;
    //TODO : 3개는 더 넣어줘야함
    private boolean isJoined;
    private boolean isOwned;
    private int joinUserCount;

    @Builder
    public GameSimpleRes(Long gameId, String appName, Long metascore, Long price, String sentiment, String logoImagePath, String backgoundImagePath) {
        this.gameId = gameId;
        this.appName = appName;
        this.metascore = metascore;
        this.price = price;
        this.sentiment = sentiment;
        this.logoImagePath = logoImagePath;
        this.backgoundImagePath = backgoundImagePath;
    }

    public GameSimpleRes(Game game){
        this.gameId = game.getId();
        this.appName = game.getAppName();
        this.metascore = game.getMetascore();
        this.price = game.getPrice();
        this.sentiment = game.getSentiment();
        this.logoImagePath = game.getLogoImagePath();
        this.backgoundImagePath = game.getBackgroundImagePath();
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