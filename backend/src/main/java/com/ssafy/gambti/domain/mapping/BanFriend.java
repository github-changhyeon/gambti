package com.ssafy.gambti.domain.mapping;

import com.ssafy.gambti.domain.user.User;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class BanFriend {

    @Id
    Long id;

    @ManyToOne
    @JoinColumn(name = "student_id")
    User userId;

    @ManyToOne
    @JoinColumn(name = "course_id")
    User banUserId;

}
