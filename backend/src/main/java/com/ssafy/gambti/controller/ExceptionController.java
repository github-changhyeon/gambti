package com.ssafy.gambti.controller;

import com.ssafy.gambti.controller.account.AccountController;
import com.ssafy.gambti.exception.GameListException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class ExceptionController {
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    //400
    @ExceptionHandler({RuntimeException.class, GameListException.class})
    public ResponseEntity<Object> BadRequestException(final RuntimeException e){
        Map<String, Object> errorObject = new HashMap<>();
        errorObject.put("message", "bad request!");
        errorObject.put("error", HttpStatus.BAD_REQUEST);
        errorObject.put("timestamp", new Timestamp(new Date().getTime()));
        return ResponseEntity.badRequest().body(errorObject);
    }

    //500
    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> internalServerException(final Exception e){
        logger.error(e.getMessage());
        return new ResponseEntity<>("SERVER ERROR!",HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
