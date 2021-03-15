package com.ssafy.gambti.config.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
public class OpenApiConfig {
    static final String OPEN_API_TITLE = "GAMBTI API";
    static final String OPEN_API_DESC = "GAMBTI REST API 문서입니다.";
    static final String OPEN_API_TERMS_OF_SERVICE = "http://swagger.io/terms/";
    static final String OPEN_API_LICENSE = "Apache License Version 2.0";

    @Bean
    public OpenAPI openAPI(@Value("${springdoc.version}") String appVersion){
        Info info = new Info()
                .title(OPEN_API_TITLE)
                .version(appVersion)
                .description(OPEN_API_DESC)
                .termsOfService(OPEN_API_TERMS_OF_SERVICE)
                .license(new License().name(OPEN_API_LICENSE));
        return new OpenAPI()
                .components(new Components()).info(info);
    }
}
