package com.ssafy.gambti.dto.game;

import com.ssafy.gambti.domain.genre.Genre;
import com.ssafy.gambti.domain.tag.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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



}
