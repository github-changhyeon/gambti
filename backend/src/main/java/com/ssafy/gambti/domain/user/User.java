package com.ssafy.gambti.domain.user;


import lombok.Builder;
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
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "NO", insertable = false, updatable = false)
    private Long no;

    @Column(name="USER_ID", updatable = false)
    private String id;

    @Column(nullable = false)
    private String nickname;

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

    // user joined game
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserJoinGame> userJoinGames = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserOwnGame> userOwnGames = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserBanGame> userBanGames = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserLikeTag> userLikeTags = new ArrayList<>();

    @Builder
    public User(String id, String nickname, UserMBTI mbti, int age, UserGender gender, long maxPrice, String steamId, UserRole role) {
        this.id = id;
        this.nickname = nickname;
        this.mbti = mbti;
        this.age = age;
        this.gender = gender;
        this.maxPrice = maxPrice;
        this.steamId = steamId;
        this.role = role;
    }
}

