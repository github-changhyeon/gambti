package com.ssafy.gambti.domain.game;

import com.ssafy.gambti.domain.user.*;
import com.ssafy.gambti.domain.wordcloud.WordCloud;
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

    private String backgroundImagePath;

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameGenre> gameGenres = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<GameTag> gameTags = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<UserJoinGame> userJoinGames = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<UserOwnGame> userOwnGames = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<UserBanGame> userBanGames = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<UserRecommendGame> userRecommendGames = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<UserRecommendGameInit> userInitRecommendGames = new ArrayList<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL)
    private List<WordCloud> keywords = new ArrayList<>();
}
