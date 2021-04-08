package com.ssafy.gambti.controller.wordcloud;

import com.ssafy.gambti.controller.game.GameController;
import com.ssafy.gambti.dto.basicResponse.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="WordCloud", description = "워드 클라우드 REST API")
@RestController
@RequestMapping(value = "wordCloud")
public class WordCloudController {
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    //TODO: 이걸 따로 컨트롤러로 빼야하는가? 게임 detail에서 추가적으로 데이터를 보내주면 안되나?
    @GetMapping
    @Operation(summary = "워드 클라우드", description = "")
    public ResponseEntity<? extends Response> findWordCloud(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}
