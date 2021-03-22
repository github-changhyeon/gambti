package com.ssafy.gambti.domain.mapping;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.gambti.domain.user.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "friend")
@Getter @Setter
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="FRIEND_ID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FROM_ID")
    private User from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TO_ID")
    private User to;

    /*
    # flow
        A가 B에게 친구 신청을 하면 --> A(from_uid), B(to_uid), is_approved(false)
        B가 수락을 하면
		is_approved 변경 --> A(from_uid), B(to_uid), is_approved(true)
	    B와 A 친구 관계설정 --> B(from_uid), A(to_uid), is_approved(true)
     */
    @Column(columnDefinition = "boolean default false")
    private boolean isApproved = false;

}
