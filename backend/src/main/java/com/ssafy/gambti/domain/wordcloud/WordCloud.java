package com.ssafy.gambti.domain.wordcloud;

import com.ssafy.gambti.domain.game.Game;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "wordcloud")
@AllArgsConstructor
@Getter
public class WordCloud {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "WORD_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "GAME_ID")
    private Game game;

    private String word;

    private int weight;

}
