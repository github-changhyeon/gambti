package com.ssafy.gambti.domain.game;

import com.ssafy.gambti.domain.image.Image;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Game {

    @Id
    @Column(name = "GAME_ID", insertable = false)
    private Long id;

    @Column(nullable = false, unique = true)
    private String appName;

    private String developer;

    private String publisher;

    private String releaseDate;

    private Long metaScore;

    private Long price;

    private String sentiment;

    private String url;

    private String videoUrl;

    @OneToOne
    @JoinColumn(name="IMAGE_ID", insertable=false, updatable=false)
    private Image logoImage;

    @OneToOne
    @JoinColumn(name="IMAGE_ID", insertable=false, updatable=false)
    private Image backgroundImage;

}
