package com.ssafy.gambti.domain.genre;

import com.ssafy.gambti.domain.game.Game;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "genre")
@AllArgsConstructor
@Getter
public class Genre {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "GENRE_ID")
    private Long id;

    private String genreName;

    @ManyToMany(mappedBy = "genres", fetch = FetchType.LAZY)
    private List<Game> games = new ArrayList<>();

}
