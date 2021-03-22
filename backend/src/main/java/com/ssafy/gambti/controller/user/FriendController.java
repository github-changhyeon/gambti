package com.ssafy.gambti.controller.user;

import com.ssafy.gambti.dto.basicResponse.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="Friend", description = "친구 관리 REST API")
@RestController
@RequestMapping(value = "friend")
public class FriendController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping(value = "/recommends")
    @Operation(summary = "친구 추천", description = "해당 사용자와 잘 맞을거 같은 친구를 추천한다.")
    public ResponseEntity<? extends Response> friendRecommends(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @PostMapping(value = "/add")
    @Operation(summary = "친구 추가", description = "사용자가 다른 사용자를 친구로 등록한다.")
    public ResponseEntity<? extends Response> addToFriends(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete")
    @Operation(summary = "친구 삭제", description = "사용자가 추가되어 있던 친구를 삭제한다.")
    public ResponseEntity<? extends Response> deleteFriend(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @GetMapping(value = "/list")
    @Operation(summary = "친구 리스트 조회", description = "사용자의 친구 리스트를 조회한다.")
    public ResponseEntity<? extends Response> searchForFriendByUsers(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}
