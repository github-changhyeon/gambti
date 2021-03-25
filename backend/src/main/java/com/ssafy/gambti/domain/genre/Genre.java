package com.ssafy.gambti.domain.genre;

import com.ssafy.gambti.domain.game.GameGenre;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "genre")
@Getter
@Setter
public class Genre {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "GENRE_ID")
    private Long id;

    private String genreName;

    @OneToMany(mappedBy = "genre",  cascade = CascadeType.ALL)
    private List<GameGenre> gameGenres = new ArrayList<>();

    public static List<String> listOf(List<GameGenre> gameGenres){
        List<String> genreList = new ArrayList<>();
        for (GameGenre gg : gameGenres) {
            genreList.add(gg.getGenre().getGenreName());
        }
        return genreList;
    }
}
