package com.ssafy.gambti.domain.game;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "game")
@RequiredArgsConstructor
@Getter
public class Game {

    @Id
    @Column(name = "GAME_ID", insertable = false)
    private Long id;

    @Column(nullable = false, unique = true)
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

}
