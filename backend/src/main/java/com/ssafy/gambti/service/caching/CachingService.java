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
}