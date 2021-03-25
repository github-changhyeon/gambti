package com.ssafy.gambti.controller.game;

import com.ssafy.gambti.commons.PageRequest;
import com.ssafy.gambti.dto.basicResponse.Response;
import com.ssafy.gambti.dto.game.GameDetailRes;
import com.ssafy.gambti.dto.game.GameSimpleRes;
import com.ssafy.gambti.service.game.GameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Tag(name="Games", description = "게임 REST API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "games")
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final GameService gameService;

    @GetMapping
    @Operation(summary = "모든 게임 조회", description = "게임 list를 조회한다. page, size, sort를 이용해 정렬한다.")
    public ResponseEntity<? extends Response> findAllGames(final PageRequest pageable){
        Page<GameSimpleRes> pagingGames = gameService.findAllGames(pageable.of());
        return new ResponseEntity<>(new Response(SUCCESS, "게임 조회 성공", pagingGames), HttpStatus.OK);
    }


    @GetMapping(value = "recommends")
    @Operation(summary = "추천 게임 조회 ", description = "추천 게임 list를 조회한다. page, size, sort를 이용해 정렬한다.")
    public ResponseEntity<? extends Response> gameRecommends(){

        logger.info("추천 게임 조회");

        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @PostMapping(value = "/recommends/{gameId}")
    @Operation(summary = "추천게임 중 필요없는 게임 제거", description = "gameId를 이용해 게임 추천 제거")
    public ResponseEntity<? extends Response> banFromGameRecommends(){

        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @GetMapping(value="/{gameId}")
    @Operation(summary = "선택된 게임의 detail 정보를 조회", description = "gameId를 통해 하나의 게임의 detail을 조회한다.")
    public ResponseEntity<? extends Response> gameDetail(@PathVariable Long gameId){
        GameDetailRes gameDetail = gameService.gameDetail(gameId);
        if (gameDetail != null) {
            return new ResponseEntity<>(new Response(SUCCESS, "게임 디테일 조회 성공", gameDetail), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response(FAIL, "게임 디테일 조회 실패", null), HttpStatus.BAD_REQUEST);
        }
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

