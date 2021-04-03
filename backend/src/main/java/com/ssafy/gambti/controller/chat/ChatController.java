package com.ssafy.gambti.controller.chat;

import com.ssafy.gambti.service.chat.ChatService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name="Chatting", description = "Chat REST API")
@RequiredArgsConstructor
@RestController
@RequestMapping(value = "chat")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ChatService chatService;
//
//    @GetMapping(value = "/send")
//    @Operation(summary = "메세지 쓰기", description = "메세지를 전송한다.")
//    public ResponseEntity<? extends Response> findGames(@RequestBody MessageRequest messageRequest){
//
//        return new ResponseEntity<>(new Response(SUCCESS, "게임 조회 성공", null), HttpStatus.OK);
//    }

}
