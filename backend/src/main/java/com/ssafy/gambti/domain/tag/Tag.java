package com.ssafy.gambti.domain.tag;

import com.ssafy.gambti.domain.game.Game;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tag")
@AllArgsConstructor
@Getter
public class Tag {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "TAG_ID")
    private Long id;

    private String tagName;

    @ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
    private List<Game> games = new ArrayList<>();

}
