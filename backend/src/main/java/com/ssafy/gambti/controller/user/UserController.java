package com.ssafy.gambti.controller.user;

import com.ssafy.gambti.controller.game.GameController;
import com.ssafy.gambti.dto.basicResponse.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="User", description = "일반 사용자 REST API")
@RestController
@RequestMapping(value = "user")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping(value = "/signIn")
    @Operation(summary = "사용자 로그인", description = "사용자가 로그인 한다.")
    public ResponseEntity<? extends Response> signInUser(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @PostMapping(value = "/signUp")
    @Operation(summary = "회원 가입", description = "비회원이 회원 가입을 요청한다.")
    public ResponseEntity<? extends Response> signUpUser(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @RequestMapping(value = "/modify", method = RequestMethod.PATCH)
    @Operation(summary = "회원 정보 수정", description = "회원이 본인의 정보 수정을 요청한다.")
    public ResponseEntity<? extends Response> ModifyUserInfo(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @DeleteMapping(value = "/withdrawal")
    @Operation(summary = "회원 탈퇴", description = "사용자가 회원을 탈퇴한다.")
    public ResponseEntity<? extends Response> withdrawal(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @GetMapping(value = "/detail")
    @Operation(summary = "사용자 상세정보", description = "사용자가 유저의 detail을 조회한다.")
    public ResponseEntity<? extends Response> findUserDetail(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    //TODO : 친구는 따로 컨트롤러 빼는건 어떨까?
    @GetMapping(value = "/friends/recommends")
    @Operation(summary = "친구 추천", description = "해당 사용자와 잘 맞을거 같은 친구를 추천한다.")
    public ResponseEntity<? extends Response> friendRecommends(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @PostMapping(value = "/friends/add")
    @Operation(summary = "친구 추가", description = "사용자가 다른 사용자를 친구로 등록한다.")
    public ResponseEntity<? extends Response> addToFriends(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @DeleteMapping(value = "/friends/delete")
    @Operation(summary = "친구 삭제", description = "사용자가 추가되어 있던 친구를 삭제한다.")
    public ResponseEntity<? extends Response> deleteFriend(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @GetMapping(value = "/friends/search")
    @Operation(summary = "친구 리스트 조회", description = "사용자의 친구 리스트를 조회한다.")
    public ResponseEntity<? extends Response> searchForFriendByUsers(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    //TODO : rest API 설계자에게 물어봐야함
    @GetMapping(value = "/search")
    @Operation(summary = "유저 검색", description = "모든 유저의 리스트를 받아온다.")
    public ResponseEntity<? extends Response> searchAllUsers(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    //TODO : rest API 설계자에게 물어봐야함
    @GetMapping(value = "/search/{word}")
    @Operation(summary = "유저 검색", description = "유저 이름으로 검색한다.")
    public ResponseEntity<? extends Response> searchToWord(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}
