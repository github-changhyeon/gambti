package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.UserGender;
import com.ssafy.gambti.domain.user.UserMBTI;
import com.ssafy.gambti.domain.user.UserRecommendGameInit;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRecommendGameInitRepository extends JpaRepository<UserRecommendGameInit, Long> {

    Page<UserRecommendGameInit> findByMbtiAndGender(UserMBTI mbti, UserGender gender, Pageable pageable);

    List<UserRecommendGameInit> findByMbtiAndGender(UserMBTI mbti, UserGender gender);

    @Query("SELECT urgi FROM UserRecommendGameInit urgi WHERE urgi.mbti = :mbti AND urgi.gender = :gender AND urgi.game NOT IN :exclusives")
    Page<UserRecommendGameInit> findByUserIdAndExclusivesNotIn(@Param("mbti") UserMBTI mbti, @Param("gender") UserGender gender, @Param("exclusives") Set<Game> Exclusives, Pageable pageable);

    @Query("SELECT urgi FROM UserRecommendGameInit urgi WHERE urgi.mbti = :mbti AND urgi.gender = :gender AND urgi.game NOT IN :exclusives")
    List<UserRecommendGameInit> findByUserIdAndExclusivesNotIn(@Param("mbti") UserMBTI mbti, @Param("gender") UserGender gender, @Param("exclusives") Set<Game> Exclusives);

}
