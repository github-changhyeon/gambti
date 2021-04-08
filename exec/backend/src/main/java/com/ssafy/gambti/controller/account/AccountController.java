package com.ssafy.gambti.controller.account;

import com.ssafy.gambti.dto.account.ModifyUserInfoRequest;
import com.ssafy.gambti.dto.account.SignUpRequest;
import com.ssafy.gambti.dto.basicResponse.Response;
import com.ssafy.gambti.service.account.AccountService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name="Account", description = "Account REST API")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "account")
public class AccountController {
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final AccountService accountService;


    @GetMapping(value = "/signin")
    @Operation(summary = "사용자 로그인", description = "사용자가 로그인 한다.")
    public ResponseEntity<? extends Response> signInUser(HttpServletRequest httpServletRequest){
        //해당 유저의 게임 추천 리스트를 반환한다.


        return new ResponseEntity<>(new Response(SUCCESS, "로그인 성공", "test"), HttpStatus.OK);
    }

    @PostMapping(value = "/signup")
    @Operation(summary = "회원 가입", description = "비회원이 회원 가입을 요청한다.")
    public ResponseEntity<? extends Response> signUpUser(@RequestBody SignUpRequest signUpRequest, HttpServletRequest httpServletRequest){

        boolean result = accountService.signUp(signUpRequest, httpServletRequest);

        if(result) {
           return new ResponseEntity<>(new Response(SUCCESS, "회원가입 성공", null), HttpStatus.OK);
       }
       else{
           return new ResponseEntity<>(new Response(FAIL, "회원가입 실패", null), HttpStatus.BAD_REQUEST);
       }
    }


    @RequestMapping(method = RequestMethod.PATCH)
    @Operation(summary = "회원 정보 수정", description = "회원이 본인의 정보 수정을 요청한다.")
    public ResponseEntity<? extends Response> ModifyUserInfo(@RequestBody ModifyUserInfoRequest modifyUserInfoRequest, HttpServletRequest httpServletRequest){
        accountService.modifyUserInfo(modifyUserInfoRequest, httpServletRequest);
        return new ResponseEntity<>(new Response(SUCCESS, "수정 성공", null), HttpStatus.OK);
    }

    @DeleteMapping
    @Operation(summary = "회원 탈퇴", description = "사용자가 회원을 탈퇴한다.")
    public ResponseEntity<? extends Response> withdrawal(HttpServletRequest httpServletRequest){

        boolean result = accountService.withdrawal(httpServletRequest);

        if(result) {
            return new ResponseEntity<>(new Response(SUCCESS, "회원탈퇴 성공", null), HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new Response(FAIL, "회원탈퇴 실패", null), HttpStatus.BAD_REQUEST);
        }
    }
}
