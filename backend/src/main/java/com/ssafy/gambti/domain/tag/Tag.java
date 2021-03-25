package com.ssafy.gambti.domain.tag;

import com.ssafy.gambti.domain.game.GameTag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tag")
@Getter
@Setter
public class Tag {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "TAG_ID")
    private Long id;

    private String tagName;


    @OneToMany(mappedBy = "tag",  cascade = CascadeType.ALL)
    private List<GameTag> gameTags = new ArrayList<>();

    public static List<String> listOf(List<GameTag> gameTag){
        List<String> tagList = new ArrayList<>();
        for (GameTag gt: gameTag) {
            tagList.add(gt.getTag().getTagName());
        }
        return tagList;
    }
}
