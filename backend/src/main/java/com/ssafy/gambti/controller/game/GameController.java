package com.ssafy.gambti.controller.game;

import com.ssafy.gambti.commons.PageRequest;
import com.ssafy.gambti.dto.basicResponse.Response;
import com.ssafy.gambti.dto.game.GameDetailRes;
import com.ssafy.gambti.dto.game.GameRecommendDto;
import com.ssafy.gambti.dto.game.GameSimpleRes;
import com.ssafy.gambti.dto.game.JoinGamesRes;
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

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Tag(name="Games", description = "게임 REST API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "games")
public class GameController {

    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final GameService gameService;

    @GetMapping(value = "/find",params = {"genreId"})
    @Operation(summary = "모든 게임 조회(장르 데이터 포함하면 장르별 게임만 받음)", description = "게임 list를 조회한다. page, size, sort를 이용해 정렬한다.")
    public ResponseEntity<? extends Response> findGames(Long genreId, final PageRequest pageable, HttpServletRequest httpServletRequest){
        Page<GameSimpleRes> pagingGames = gameService.findGames(genreId, pageable.of(), httpServletRequest);
        return new ResponseEntity<>(new Response(SUCCESS, "게임 조회 성공", pagingGames), HttpStatus.OK);
    }


    @GetMapping(value = "/recommends/{genreId}")
    @Operation(summary = "추천 게임 조회 ", description = "추천 게임 list를 조회한다.")
    public ResponseEntity<? extends Response> gameRecommends(@PathVariable Long genreId, HttpServletRequest httpServletRequest){
        //지금은 우선 random으로 섞어서 주자(페이징 필요 없음)
        List<GameRecommendDto> gameSimpleResList = gameService.gameRecommends(genreId, httpServletRequest);
        return new ResponseEntity<>(new Response(SUCCESS, "추천 게임 조회 성공", gameSimpleResList), HttpStatus.OK);
    }

// TODO: 2021-03-26 추천 알고리즘 완료 후 진행

//    @PostMapping(value = "/recommends/{gameId}")
//    @Operation(summary = "추천게임 중 필요없는 게임 제거", description = "gameId를 이용해 게임 추천 제거")
//    public ResponseEntity<? extends Response> banFromGameRecommends(@PathVariable Long gameId, HttpServletRequest httpServletRequest){
//        //bangame에 등록해두고 하나 받아서 주자.
//        GameSimpleRes gameSimpleRes = gameService.banFromGameRecommend(gameId, httpServletRequest);
//
//        return new ResponseEntity<>(new Response(SUCCESS, "test", gameSimpleRes), HttpStatus.OK);
//    }


    @GetMapping(value="/detail/{gameId}")
    @Operation(summary = "선택된 게임의 detail 정보를 조회", description = "gameId를 통해 하나의 게임의 detail을 조회한다.")
    public ResponseEntity<? extends Response> gameDetail(@PathVariable Long gameId, HttpServletRequest httpServletRequest){
        GameDetailRes gameDetail = gameService.gameDetail(gameId, httpServletRequest);
        if (gameDetail != null) {
            return new ResponseEntity<>(new Response(SUCCESS, "게임 디테일 조회 성공", gameDetail), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response(FAIL, "게임 디테일 조회 실패", null), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping(value = "/joinLeave/{gameId}")
    @Operation(summary = "선택한 게임 커뮤니티 상태 변경", description = "유저가 선택한 게임(gameId) 커뮤니티에 조인 or 탈퇴한다.")
    public ResponseEntity<? extends Response> joinOrLeaveToGame(@PathVariable long gameId, HttpServletRequest httpServletRequest){
        if(gameService.joinOrLeaveToGame(gameId, httpServletRequest)) {
            return new ResponseEntity<>(new Response(SUCCESS, "변경 완료", null), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new Response(SUCCESS, "변경 실패", null), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/joinGames")
    @Operation(summary = "유저가 join한 게임 리스트 받기", description = "유저가 이전에 join했던 게임을 받아온다.")
    public ResponseEntity<? extends Response> joinGames(HttpServletRequest httpServletRequest){
        List<JoinGamesRes> joinGamesRes = gameService.joinGame(httpServletRequest);
        return new ResponseEntity<>(new Response(SUCCESS, "유저가 join한 게임 정보", joinGamesRes), HttpStatus.OK);
    }

        //TODO : 주석처리 요청은 다른 service로 합친것 들
//    @DeleteMapping(value = "/join/{gameId}")
//    @Operation(summary = "선택한 게임 커뮤니티에서 떠남", description = "조인했던 게임(gameId)에서 나간다.")
//    public ResponseEntity<? extends Response> leaveToGame(){
//
//
//        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
//    }

//    @GetMapping(value = "/genres/{genreId}/games")
//    @Operation(summary = "해당 장르 리스트 받기", description = "선택한 장르 리스트를 페이징하여 받는다.")
//    public ResponseEntity<? extends Response> findGamesInGenre(@PathVariable Long genreId, final PageRequest pageable, HttpServletRequest httpServletRequest){
//        Page<Game> games = gameService.findGamesInGenre(genreId, pageable.of(), httpServletRequest);
//        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
//    }

//
//    @GetMapping(value = "/genres/{genreId}/recommends")
//    @Operation(summary = "장르별 추천 게임 조회", description = "사용자가 선택한 장르에 대해 추천 게임을 조회한다.")
//    public ResponseEntity<? extends Response> gameRecommendationsByGenre(){
//
//        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
//    }
}

