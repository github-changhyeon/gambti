package com.ssafy.gambti.domain.game;

import com.ssafy.gambti.domain.genre.Genre;
import com.ssafy.gambti.domain.tag.Tag;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToMany
    @JoinTable(
            name = "game_genre",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "game_tag",
            joinColumns = @JoinColumn(name = "game_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags = new ArrayList<>();

}
