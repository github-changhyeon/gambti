package com.ssafy.gambti.models.basicResponse;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private String status;
    private String message;
    private Object data;
}
