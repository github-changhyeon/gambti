package com.ssafy.gambti.dto.game;

import com.ssafy.gambti.domain.game.Game;
import lombok.Getter;

@Getter
public class JoinGamesRes {
    private Long gameId;
    private String appName;
    private String logoImagePath;

    public JoinGamesRes(Game game) {
        this.gameId = game.getId();
        this.appName = game.getAppName();
        this.logoImagePath = game.getLogoImagePath();
    }
}
