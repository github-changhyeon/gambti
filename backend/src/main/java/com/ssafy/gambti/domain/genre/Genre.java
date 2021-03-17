package com.ssafy.gambti.domain.genre;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "genre")
@AllArgsConstructor
@Getter
public class Genre {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "GENRE_ID")
    private Long id;

    private String genreName;

}
