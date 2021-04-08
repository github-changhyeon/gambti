package com.ssafy.gambti.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_ban_friend")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class UserBanFriend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FROM_ID")
    private User from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TO_ID")
    private User to;

}
