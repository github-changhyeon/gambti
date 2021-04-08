package com.ssafy.gambti.domain.user;

import com.ssafy.gambti.domain.game.Game;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_ban_game")
@NoArgsConstructor
@Getter
public class UserBanGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    public UserBanGame(User user, Game game) {
        this.user = user;
        this.game = game;
    }

}
