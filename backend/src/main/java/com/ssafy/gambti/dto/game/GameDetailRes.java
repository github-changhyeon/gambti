package com.ssafy.gambti.dto.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.genre.Genre;
import com.ssafy.gambti.domain.tag.Tag;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GameDetailRes {

    private Long gameId;
    private String appName;
    private String developer;
    private String publisher;
    private String releaseDate;
    private Long metascore;
    private Long price;
    private String sentiment;
    private String url;
    private String videoUrl;
    private String logoImagePath;
    private String backgroundImagePath;
    private List<String> tags;
    private List<String> genres;
    private boolean isJoined;
    private boolean isOwned;
    private int joinUserCount;

    public static GameDetailRes of(Game game){
        GameDetailRes gameDetailRes = GameDetailRes.builder()
                .gameId(game.getId())
                .appName(game.getAppName())
                .developer(game.getDeveloper())
                .publisher(game.getPublisher())
                .releaseDate(game.getReleaseDate())
                .metascore(game.getMetascore())
                .price(game.getPrice())
                .sentiment(game.getSentiment())
                .url(game.getUrl())
                .videoUrl(game.getVideoUrl())
                .logoImagePath(game.getLogoImagePath())
                .backgroundImagePath(game.getBackgroundImagePath())
                .tags(Tag.listOf(game.getGameTags()))
                .genres(Genre.listOf(game.getGameGenres()))
                .build();
        return gameDetailRes;
    }

    public void setJoined(boolean joined) {
        isJoined = joined;
    }

    public void setOwned(boolean owned) {
        isOwned = owned;
    }

    public void setJoinUserCount(int joinUserCount) {
        this.joinUserCount = joinUserCount;
    }
}
