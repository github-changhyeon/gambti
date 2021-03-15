package com.ssafy.gambti.controller;

import com.ssafy.gambti.models.basicResponse.Response;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="temp", description = "temp API")
@RestController
@RequestMapping(value = "/temp")
public class TempController {
    private static final String SUCCESS = "success";

    @GetMapping("/test")
    public ResponseEntity<? extends Response> temp(){


        return new  ResponseEntity<>(new Response(SUCCESS, "test", "test"), HttpStatus.OK);
    }
}