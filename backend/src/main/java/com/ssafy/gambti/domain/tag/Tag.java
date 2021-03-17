package com.ssafy.gambti.domain.tag;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;

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

}
