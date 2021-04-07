package com.ssafy.gambti.domain.user;

import com.ssafy.gambti.domain.game.Game;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_recommend_game_init")
@NoArgsConstructor
@Getter
public class UserRecommendGameInit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(nullable = false)
    private double rating;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserMBTI mbti;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserGender gender;

}
