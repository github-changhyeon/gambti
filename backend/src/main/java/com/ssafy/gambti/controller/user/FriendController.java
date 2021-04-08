package com.ssafy.gambti.controller.user;

import com.ssafy.gambti.dto.basicResponse.Response;
import com.ssafy.gambti.dto.user.UserIdListRes;
import com.ssafy.gambti.service.user.FriendService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name="Friend", description = "친구 관리 REST API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "friends")
public class FriendController {
    private static final Logger logger = LoggerFactory.getLogger(FriendController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final FriendService friendService;

    @PostMapping(value = "/{userId}")
    @Operation(summary = "친구 추가", description = "사용자가 다른 사용자를 친구로 등록한다.")
    public ResponseEntity<? extends Response> addFriend(@PathVariable("userId") String toUserId, HttpServletRequest httpServletRequest){

        boolean result = friendService.addFriend(toUserId, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(new Response(SUCCESS, "친구 추가 성공", null), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response(FAIL, "친구 추가 실패", null), HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(value = "/{userId}")
    @Operation(summary = "친구 삭제", description = "사용자가 추가되어 있던 친구를 삭제한다.")
    public ResponseEntity<? extends Response> deleteFriend(@PathVariable("userId") String toUserId, HttpServletRequest httpServletRequest){

        boolean result = friendService.deleteFriend(toUserId, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(new Response(SUCCESS, "친구 삭제 성공", null), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response(FAIL, "친구 삭제 실패", null), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/recommends")
    @Operation(summary = "친구 추천", description = "사용자와 어울릴 수 있는 친구를 추천한다.")
    public ResponseEntity<? extends Response> recommendFriends(HttpServletRequest httpServletRequest){

        UserIdListRes data = friendService.recommendFriends(httpServletRequest);

        return new ResponseEntity<>(new Response(SUCCESS, "친추 추천 리스트 받기 성공", data), HttpStatus.OK);
    }

    @PostMapping(value = "/recommends/{userId}/ban")
    @Operation(summary = "추천 친구 삭제(밴)", description = "추천친구 리스트의 유저를 추천 받지 않기 위해 삭제(밴)한다.")
    public ResponseEntity<? extends Response> banFriendOfRecommends(@PathVariable("userId") String toUserId, HttpServletRequest httpServletRequest){
        logger.info(toUserId);
        boolean result = friendService.banFriendOfRecommends(toUserId, httpServletRequest);

        if (result) {
            return new ResponseEntity<>(new Response(SUCCESS, "추천친구 밴 성공", null), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Response(FAIL, "추천친구 밴 실패", null), HttpStatus.BAD_REQUEST);
        }

    }
}
