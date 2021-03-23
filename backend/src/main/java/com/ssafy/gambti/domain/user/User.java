package com.ssafy.gambti.domain.user;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

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
