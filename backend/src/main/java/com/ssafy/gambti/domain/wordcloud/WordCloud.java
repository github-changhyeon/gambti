package com.ssafy.gambti.domain.wordcloud;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "wordcloud")
@AllArgsConstructor
@Getter
public class WordCloud {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "WORD_ID")
    private Long id;

    private String word;

}
