package com.ssafy.gambti.dto.basicResponse;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Response {
    private String status;
    private String message;
    private String data;
}
