package com.ssafy.gambti.controller.account;

import com.ssafy.gambti.controller.game.GameController;
import com.ssafy.gambti.dto.basicResponse.Response;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name="Account", description = "Account REST API")
@RestController
@RequestMapping(value = "account")
public class AccountController {
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping(value = "/signin")
    @Operation(summary = "사용자 로그인", description = "사용자가 로그인 한다.")
    public ResponseEntity<? extends Response> signInUser(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    @Operation(summary = "회원 가입", description = "비회원이 회원 가입을 요청한다.")
    public ResponseEntity<? extends Response> signUpUser(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }


    @RequestMapping(method = RequestMethod.PATCH)
    @Operation(summary = "회원 정보 수정", description = "회원이 본인의 정보 수정을 요청한다.")
    public ResponseEntity<? extends Response> ModifyUserInfo(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }

    @DeleteMapping
    @Operation(summary = "회원 탈퇴", description = "사용자가 회원을 탈퇴한다.")
    public ResponseEntity<? extends Response> withdrawal(){


        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}
