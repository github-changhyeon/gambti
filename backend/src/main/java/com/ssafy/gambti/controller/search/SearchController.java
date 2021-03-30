package com.ssafy.gambti.controller.search;

import com.ssafy.gambti.commons.PageRequest;
import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.dto.basicResponse.Response;
import com.ssafy.gambti.dto.user.UserSimpleRes;
import com.ssafy.gambti.service.game.GameService;
import com.ssafy.gambti.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@Tag(name="Search", description = "검색 REST API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "search")
public class SearchController {
    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final UserService userService;

    @GetMapping(value = "/{word}")
    @Operation(summary = "검색", description = "입력된 word에 대한 user, game에 대한 검색 리스트")
    public ResponseEntity<? extends Response> searchToWord(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @GetMapping(value = "/users/{word}")
    @Operation(summary = "유저 검색", description = "유저 닉네임으로 유저를 검색한다.")
    public ResponseEntity<? extends Response> searchUserByNickname(@PathVariable String word, final PageRequest pageable, HttpServletRequest httpServletRequest){

        Page<UserSimpleRes> data = userService.searchUserByNickname(word, pageable.of(), httpServletRequest);

        return new ResponseEntity<>(new Response(SUCCESS, "test", data), HttpStatus.OK);
    }

    @GetMapping(value = "/games/{word}")
    @Operation(summary = "검색어를 포함하는 게임 리스트 검색", description = "검색어를 통해 선택한 장르에서 게임을 검색한다.")
    public ResponseEntity<? extends Response> searchFromGames(){

        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}
