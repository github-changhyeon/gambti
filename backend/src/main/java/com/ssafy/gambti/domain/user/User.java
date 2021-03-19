package com.ssafy.gambti.domain.user;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "user")
@RequiredArgsConstructor
@Getter
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

    @UpdateTimestamp
    private Timestamp updatedDate;

    private String steamId;

    private String profileImagePath;

    @Enumerated(EnumType.STRING)
    private UserRole role;

}
