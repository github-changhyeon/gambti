package com.ssafy.gambti.controller.game;

import com.ssafy.gambti.dto.basicResponse.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="Games", description = "게임 REST API")
@RestController
@RequestMapping(value = "games")
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping(params = {"page", "size", "sort"})
    @Operation(summary = "모든 게임 조회", description = "게임 list를 조회한다. page, size, sort를 이용해 정렬한다.")
    public ResponseEntity<? extends Response> findAllGames(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @GetMapping(value = "recommends")
    @Operation(summary = "추천 게임 조회 ", description = "추천 게임 list를 조회한다. page, size, sort를 이용해 정렬한다.")
    public ResponseEntity<? extends Response> gameRecommends(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @PostMapping(value = "recommends/{gameId}")
    @Operation(summary = "추천게임 중 필요없는 게임 제거", description = "gameId를 이용해 게임 추천 제거")
    public ResponseEntity<? extends Response> banFromGameRecommends(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @GetMapping(value="/detail/{gameId}")
    @Operation(summary = "선택된 게임의 detail 정보를 조회", description = "gameId를 통해 하나의 게임의 detail을 조회한다.")
    public ResponseEntity<? extends Response> gameDetail(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @PostMapping(value = "/join/{gameId}")
    @Operation(summary = "선택한 게임 커뮤니티에 조인", description = "유저가 선택한 게임(gameId) 커뮤니티에 조인한다.")
    public ResponseEntity<? extends Response> joinToGame(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @DeleteMapping(value = "/join/{gameId}")
    @Operation(summary = "선택한 게임 커뮤니티에서 떠남", description = "조인했던 게임(gameId)에서 나간다.")
    public ResponseEntity<? extends Response> leaveToGame(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @GetMapping(value = "/genres/{genreId}/games")
    @Operation(summary = "해당 장르 리스트 받기", description = "선택한 장르 리스트를 페이징하여 받는다.")
    public ResponseEntity<? extends Response> findAllGamesInGenre(){

        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @GetMapping(value = "/genres/{genreId}/recommends")
    @Operation(summary = "장르별 추천 게임 조회", description = "사용자가 선택한 장르에 대해 추천 게임을 조회한다.")
    public ResponseEntity<? extends Response> gameRecommendationsByGenre(){

        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}

