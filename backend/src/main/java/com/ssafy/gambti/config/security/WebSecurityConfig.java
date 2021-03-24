package com.ssafy.gambti.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.gambti.domain.auth.SecurityProperties;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    private static final Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);

    private final ObjectMapper objectMapper;
    private final SecurityProperties restSecProps;
    private final SecurityFilter tokenAuthenticationFilter;

    @Bean
    //인증과정에서 실패하거나 인증헤더(Authorization)를 보내지 않게되는 경우 401(UnAuthorized) 을 리턴해주는 Bean
    public AuthenticationEntryPoint restAuthenticationEntryPoint() {
        return (httpServletRequest, httpServletResponse, e) -> {
            Map<String, Object> errorObject = new HashMap<>();
            int errorCode = 401;
            errorObject.put("message", "Unauthorized access of protected resource, invalid credentials");
            errorObject.put("error", HttpStatus.UNAUTHORIZED);
            errorObject.put("code", errorCode);
            errorObject.put("timestamp", new Timestamp(new Date().getTime()));
            httpServletResponse.setContentType("application/json;charset=UTF-8");
            httpServletResponse.setStatus(errorCode);
            httpServletResponse.getWriter().write(objectMapper.writeValueAsString(errorObject));
        };
    }

    @Bean
    //Cors관련 설정
    CorsConfigurationSource corsConfigurationSource() {
        //새로운 CorsConfiguration 객체 생성
        CorsConfiguration configuration = new CorsConfiguration();
        logger.debug(configuration.toString());

        //restSecProps에서 허용할 주소 설정 ex) gambti.com
        configuration.setAllowedOrigins(restSecProps.getAllowedOrigins());

        //rest methods중 허용할 메서드 설정
        configuration.setAllowedMethods(restSecProps.getAllowedMethods());

        //request에서 허용할 헤더 종류 설정
        configuration.setAllowedHeaders(restSecProps.getAllowedHeaders());

        //CORS 자격증명을 true 또는 false 설정(true설정 해줘야 함)
        configuration.setAllowCredentials(restSecProps.isAllowCredentials());

        //실제 응답이 가질 수 있고 노출 될 수있는 단순 헤더 설정
        configuration.setExposedHeaders(restSecProps.getExposedHeaders());

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                //cors 설정
                .cors().configurationSource(corsConfigurationSource()).and()

                //rest API 서버이므로 csrf disable이므로 formLogin도 disable 시킴
                .csrf().disable().formLogin().disable().httpBasic().disable()

                //인증 헤더가 오지 않았다면 401(UnAuthorized)을 보내주기 위한 설정
                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint()).and()

                //요청에 대한 설정을 진행한다.
                .authorizeRequests()
                .antMatchers(restSecProps.getAllowedPublicApis().toArray(String[]::new)).permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated().and()
                .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }
}
