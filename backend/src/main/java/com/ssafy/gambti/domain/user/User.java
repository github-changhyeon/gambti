package com.ssafy.gambti.domain.user;


import lombok.Builder;
import com.ssafy.gambti.domain.game.Game;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@NoArgsConstructor
@Getter
@ToString
public class User {

    @Id
    @Column(name="USER_ID", insertable = false, updatable = false)
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserMBTI mbti;

    @Column(nullable = false)
    private int age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserGender gender;

    @Column(nullable = false)
    private long maxPrice;

    @CreationTimestamp
    private Timestamp createdDate;

    @UpdateTimestamp
    private Timestamp updatedDate;

    private String steamId;

    //유저 권한
    @Enumerated(EnumType.STRING)
    private UserRole role;


    // user banned friend
    @ManyToMany
    @JoinTable(name="ban_friend",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns=@JoinColumn(name="ban_user_id")
    )
    private List<User> banFriends = new ArrayList<>();

    // user joined game
    @ManyToMany
    @JoinTable(name="user_join_game",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns=@JoinColumn(name="game_id")
    )
    private List<Game> joinGames = new ArrayList<>();

    // user owned game
    @ManyToMany
    @JoinTable(name="user_own_game",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns=@JoinColumn(name="game_id")
    )
    private List<Game> ownGames = new ArrayList<>();

    // user baned game
    @ManyToMany
    @JoinTable(name="user_ban_game",
            joinColumns=@JoinColumn(name="user_id"),
            inverseJoinColumns=@JoinColumn(name="game_id")
    )
    private List<Game> banGames = new ArrayList<>();

    @Builder
    public User(String id, UserMBTI mbti, int age, UserGender gender, long maxPrice, String steamId, UserRole role) {
        this.id = id;
        this.mbti = mbti;
        this.age = age;
        this.gender = gender;
        this.maxPrice = maxPrice;
        this.steamId = steamId;
        this.role = role;
    }
}

