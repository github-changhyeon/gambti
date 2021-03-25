package com.ssafy.gambti.domain.game;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "game")
@Getter
@Setter
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

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameGenre> gameGenres = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameTag> gameTags = new ArrayList<>();
}
