package com.ssafy.gambti.domain.user;

import com.ssafy.gambti.domain.game.Game;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_recommend_game")
@NoArgsConstructor
@Getter
public class UserRecommendGame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    private float rating;

    public UserRecommendGame(User user, Game game, float rating) {
        this.user = user;
        this.game = game;
        this.rating = rating;
    }
}