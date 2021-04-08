package com.ssafy.gambti.domain.user;

import com.ssafy.gambti.domain.tag.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "user_like_tag")
@NoArgsConstructor
@Getter
public class UserLikeTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public UserLikeTag(User user, Tag tag) {
        this.user = user;
        this.tag = tag;
    }
}
