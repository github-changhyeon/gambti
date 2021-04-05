package com.ssafy.gambti.service.caching;

import com.ssafy.gambti.service.user.FriendService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class CachingService {

    private static final Logger logger = LoggerFactory.getLogger(FriendService.class);

    @Cacheable(value = "mbtiChemistry")
    public List<String> recommendMbtiList(String mbtiType){

        logger.info("collecting . . . . . . . . . .");

        List<String> recommendMbtiIdList = new ArrayList<>();

        if (mbtiType.equals("ISTJ")) {
            recommendMbtiIdList = Arrays.asList("ENFP", "ENTP", "ISFP", "INFP");
        } else if (mbtiType.equals("ISFJ")) {
            recommendMbtiIdList = Arrays.asList("ENTP", "ENFP", "INTP", "ISTP");
        } else if (mbtiType.equals("INFJ")) {
            recommendMbtiIdList = Arrays.asList("ESTP", "ESFP", "ISTP", "INTP");
        } else if (mbtiType.equals("INTJ")) {
            recommendMbtiIdList = Arrays.asList("ESFP", "ESTP", "ISFP", "INFP");
        } else if (mbtiType.equals("ISTP")) {
            recommendMbtiIdList = Arrays.asList("ENFJ", "ESFJ", "INFJ", "ISFJ");
        } else if (mbtiType.equals("ISFP")) {
            recommendMbtiIdList = Arrays.asList("ENTJ", "ESTJ", "INTJ", "ISTJ");
        } else if (mbtiType.equals("INFP")) {
            recommendMbtiIdList = Arrays.asList("ESTJ", "ENTJ", "INTJ", "ISTJ");
        } else if (mbtiType.equals("INTP")) {
            recommendMbtiIdList = Arrays.asList("ESFJ", "ENFJ", "ISFJ", "INFJ");
        } else if (mbtiType.equals("ESTP")) {
            recommendMbtiIdList = Arrays.asList("INFJ", "INTJ", "ENFJ", "ENTJ");
        } else if (mbtiType.equals("ESFP")) {
            recommendMbtiIdList = Arrays.asList("INTJ", "INFJ", "ENTJ", "ENFJ");
        } else if (mbtiType.equals("ENFP")) {
            recommendMbtiIdList = Arrays.asList("ISTJ", "ISFJ", "ESFJ", "ESTJ");
        } else if (mbtiType.equals("ENTP")) {
            recommendMbtiIdList = Arrays.asList("ISFJ", "ISTJ", "ENTP", "ESTJ");
        } else if (mbtiType.equals("ESTJ")) {
            recommendMbtiIdList = Arrays.asList("INFP", "ISFP", "INTP", "ENTP");
        } else if (mbtiType.equals("ESFJ")) {
            recommendMbtiIdList = Arrays.asList("INTP", "ISTP", "ENTP", "ENFP");
        } else if (mbtiType.equals("ENFJ")) {
            recommendMbtiIdList = Arrays.asList("ISTP", "INTP", "ESTP", "ESFP");
        } else if (mbtiType.equals("ENTJ")) {
            recommendMbtiIdList = Arrays.asList("ISFP", "INFP", "ESFP", "ESTP");
        }

        return recommendMbtiIdList;

    }

    public List<String> recommendMbtiAll(String mbtiType){

        List<String> recommendMbtiIdList = new ArrayList<>();

        if (mbtiType.equals("ISTJ")) {
            recommendMbtiIdList = Arrays.asList("ENFP", "ENTP", "ISFP", "INFP", "ESTP", "ESFP", "INTP", "ESTJ", "ESFJ", "ISTJ", "INTJ", "ISFJ", "ISTP", "ENTJ", "INFJ", "ENFJ");
        } else if (mbtiType.equals("ISFJ")) {
            recommendMbtiIdList = Arrays.asList("ENTP", "ENFP", "INTP", "ISTP", "ESFP", "ESTP", "ESTJ", "INFP", "ESFJ", "ISTJ", "ISFJ", "ENFJ", "INFJ", "ISFP", "INTJ", "ENTJ");
        } else if (mbtiType.equals("INFJ")) {
            recommendMbtiIdList = Arrays.asList("ESTP", "ESFP", "ISTP", "INTP", "ENFP", "ENTP", "INTJ", "ENTJ", "INFJ", "ISFP", "ENFJ", "ESFJ", "ISFJ", "INFP", "ISTJ", "ESTJ");
        } else if (mbtiType.equals("INTJ")) {
            recommendMbtiIdList = Arrays.asList("ESFP", "ESTP", "ISFP", "INFP", "INFJ", "ENFP", "ENTP", "ISTP", "ENFJ", "INTJ", "ISTJ", "ENTJ", "INTP", "ESTJ", "ISFJ", "ESFJ");
        } else if (mbtiType.equals("ISTP")) {
            recommendMbtiIdList = Arrays.asList("ENFJ", "ESFJ", "INFJ", "ISFJ", "ENTJ", "ESTJ", "ESFP", "ESTP", "INTJ", "ISTP", "INTP", "ENTP", "ISTJ", "ISFP", "INFP", "ENFP");
        } else if (mbtiType.equals("ISFP")) {
            recommendMbtiIdList = Arrays.asList("ENTJ", "ESTJ", "INTJ", "ISTJ", "ENFJ", "ESFJ", "INFJ", "ESFP", "ISFP", "ESTP", "ENFP", "INFP", "ISTP", "ISFJ", "INTP", "ENTP");
        } else if (mbtiType.equals("INFP")) {
            recommendMbtiIdList = Arrays.asList("ESTJ", "ENTJ", "INTJ", "ISTJ", "ENFJ", "ESFJ", "ENTP", "INFP", "ISFJ", "INTP", "ESFP", "ENFP", "ISFP", "INFJ", "ISTP", "ESTP");
        } else if (mbtiType.equals("INTP")) {
            recommendMbtiIdList = Arrays.asList("ESFJ", "ENFJ", "ISFJ", "INFJ", "ESTJ", "ISTJ", "ENTJ", "ENFP", "ENTP", "INTP", "INTJ", "ISTP", "INFP", "ESTP", "ISFP", "ESFP");
        } else if (mbtiType.equals("ESTP")) {
            recommendMbtiIdList = Arrays.asList("INFJ", "INTJ", "ENFJ", "ENTJ", "ISFJ", "ISTP", "ISTJ", "ESFJ", "ESTP", "ISFP", "ESFP", "INTP", "ENTP", "ESTJ", "ENFP", "INFP");
        } else if (mbtiType.equals("ESFP")) {
            recommendMbtiIdList = Arrays.asList("INTJ", "INFJ", "ENTJ", "ENFJ", "ESTJ", "ISTJ", "ISFJ", "ISFP", "ISTP", "INFP", "ESFP", "ESTP", "ESFJ", "ENFP", "ENTP", "INTP");
        } else if (mbtiType.equals("ENFP")) {
            recommendMbtiIdList = Arrays.asList("ISTJ", "ISFJ", "ESFJ", "ESTJ", "INFJ", "INTJ", "ENTJ", "ISFP", "ENFP", "INTP", "INFP", "ENFJ", "ENTP", "ESFP", "ESTP", "ISTP");
        } else if (mbtiType.equals("ENTP")) {
            recommendMbtiIdList = Arrays.asList("ISFJ", "ISTJ", "ENTP", "ESTJ", "ESFJ", "INFJ", "INTJ", "INFP", "ENFJ", "INTP", "ISTP", "ENFP", "ESTP", "ENTJ", "ESFP", "ISFP");
        } else if (mbtiType.equals("ESTJ")) {
            recommendMbtiIdList = Arrays.asList("INFP", "ISFP", "INTP", "ENTP", "ISTP", "ESFP", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "INTJ", "ENTJ", "ESTP", "ENFJ", "INFJ");
        } else if (mbtiType.equals("ESFJ")) {
            recommendMbtiIdList = Arrays.asList("INTP", "ISTP", "ENTP", "ENFP", "INFP", "ISTJ", "ESFJ", "ESTP", "ISFP", "ENFJ", "ISFJ", "INFJ", "ESTJ", "ESFP", "ENTJ", "INTJ");
        } else if (mbtiType.equals("ENFJ")) {
            recommendMbtiIdList = Arrays.asList("ISTP", "INTP", "ESTP", "ESFP", "ENFJ", "INFP", "ISFP", "ENTP", "INTJ", "ESFJ", "INFJ", "ENFP", "ENTJ", "ISFJ", "ESTJ", "ISTJ");
        } else if (mbtiType.equals("ENTJ")) {
            recommendMbtiIdList = Arrays.asList("ISFP", "INFP", "ESFP", "ESTP", "ISTP", "INTP", "ENFP", "INFJ", "INTJ", "ENFJ", "ISTJ", "ENTP", "ESTJ", "ENTJ", "ESFJ", "ISFJ");
        }

        return recommendMbtiIdList;
//        ENTJ : "ISFP", "INFP", "ESFP", "ESTP", "ISTP", "INTP", "ENFP", "INFJ", "INTJ", "ENFJ", "ISTJ", "ENTP", "ESTJ", "ENTJ", "ESFJ", "ISFJ"
//        ENTP : "ISFJ", "ISTJ", "ENTP", "ESTJ", "ESFJ", "INFJ", "INTJ", "INFP", "ENFJ", "INTP", "ISTP", "ENFP", "ESTP", "ENTJ", "ESFP", "ISFP"
//        INTJ : "ESFP", "ESTP", "ISFP", "INFP", "INFJ", "ENFP", "ENTP", "ISTP", "ENFJ", "INTJ", "ISTJ", "ENTJ", "INTP", "ESTJ", "ISFJ", "ESFJ"
//        INTP : "ESFJ", "ENFJ", "ISFJ", "INFJ", "ESTJ", "ISTJ", "ENTJ", "ENFP", "ENTP", "INTP", "INTJ", "ISTP", "INFP", "ESTP", "ISFP", "ESFP"
//        ESTJ : "INFP", "ISFP", "INTP", "ENTP", "ISTP", "ESFP", "ENFP", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "INTJ", "ENTJ", "ESTP", "ENFJ", "INFJ"
//        ESFJ : "INTP", "ISTP", "ENTP", "ENFP", "INFP", "ISTJ", "ESFJ", "ESTP", "ISFP", "ENFJ", "ISFJ", "INFJ", "ESTJ", "ESFP", "ENTJ", "INTJ"
//        ISTJ : "ENFP", "ENTP", "ISFP", "INFP", "ESTP", "ESFP", "INTP", "ESTJ", "ESFJ", "ISTJ", "INTJ", "ISFJ", "ISTP", "ENTJ", "INFJ", "ENFJ"
//        ISFJ : "ENTP", "ENFP", "INTP", "ISTP", "ESFP", "ESTP", "ESTJ", "INFP", "ESFJ", "ISTJ", "ISFJ", "ENFJ", "INFJ", "ISFP", "INTJ", "ENTJ"
//        ENFJ : "ISTP", "INTP", "ESTP", "ESFP", "ENFJ", "INFP", "ISFP", "ENTP", "INTJ", "ESFJ", "INFJ", "ENFP", "ENTJ", "ISFJ", "ESTJ", "ISTJ"
//        ENFP : "ISTJ", "ISFJ", "ESFJ", "ESTJ", "INFJ", "INTJ", "ENTJ", "ISFP", "ENFP", "INTP", "INFP", "ENFJ", "ENTP", "ESFP", "ESTP", "ISTP"
//        INFJ : "ESTP", "ESFP", "ISTP", "INTP", "ENFP", "ENTP", "INTJ", "ENTJ", "INFJ", "ISFP", "ENFJ", "ESFJ", "ISFJ", "INFP", "ISTJ", "ESTJ"
//        INFP : "ESTJ", "ENTJ", "INTJ", "ISTJ", "ENFJ", "ESFJ", "ENTP", "INFP", "ISFJ", "INTP", "ESFP", "ENFP", "ISFP", "INFJ", "ISTP", "ESTP"
//        ESTP : "INFJ", "INTJ", "ENFJ", "ENTJ", "ISFJ", "ISTP", "ISTJ", "ESFJ", "ESTP", "ISFP", "ESFP", "INTP", "ENTP", "ESTJ", "ENFP", "INFP"
//        ESFP : "INTJ", "INFJ", "ENTJ", "ENFJ", "ESTJ", "ISTJ", "ISFJ", "ISFP", "ISTP", "INFP", "ESFP", "ESTP", "ESFJ", "ENFP", "ENTP", "INTP"
//        ISTP : "ENFJ", "ESFJ", "INFJ", "ISFJ", "ENTJ", "ESTJ", "ESFP", "ESTP", "INTJ", "ISTP", "INTP", "ENTP", "ISTJ", "ISFP", "INFP", "ENFP"
//        ISFP : "ENTJ", "ESTJ", "INTJ", "ISTJ", "ENFJ", "ESFJ", "INFJ", "ESFP", "ISFP", "ESTP", "ENFP", "INFP", "ISTP", "ISFJ", "INTP", "ENTP"
    }

}