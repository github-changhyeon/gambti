package com.ssafy.gambti.dto.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.genre.Genre;
import com.ssafy.gambti.domain.tag.Tag;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GameDto {

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
    private String backgoundImagePath;
    private List<String> tags;
    private List<String> genres;

    public static GameDto of(Game game){
        GameDto gameDto = GameDto.builder()
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
                .backgoundImagePath(game.getBackgoundImagePath())
                .tags(Tag.listOf(game.getGameTags()))
                .genres(Genre.listOf(game.getGameGenres()))
                .build();
        return gameDto;
    }
}
