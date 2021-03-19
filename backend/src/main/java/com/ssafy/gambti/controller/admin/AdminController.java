package com.ssafy.gambti.controller.admin;

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

@Tag(name="Admin", description = "관리자 REST API")
@RestController
@RequestMapping(value = "admin")
public class AdminController {
    private static final Logger logger = LoggerFactory.getLogger(GameController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    @GetMapping
    @Operation(summary = "", description = "")
    public ResponseEntity<? extends Response> temp(){
        return new ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}
