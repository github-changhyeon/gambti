package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.UserRecommendGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRecommendGameRepository extends JpaRepository<UserRecommendGame, Long> {

    Page<UserRecommendGame> findByUserId(String userId, Pageable pageable);

    // 해당 유저가 조인한 게임을 제외한 게임을 반환한다.
    @Query("SELECT urg FROM UserRecommendGame urg WHERE urg.user.id = :uid AND urg.game NOT IN :ujg")
    Page<UserRecommendGame> findByUserIdAndUserJoinGameIn(@Param("uid") String uid, @Param("ujg") List<Game> ujg, Pageable pageable);

    @Query("SELECT urg FROM UserRecommendGame urg WHERE urg.user.id = :uid AND urg.game NOT IN :ujg")
    List<UserRecommendGame> findByUserIdAndUserJoinGameIn(@Param("uid") String uid, @Param("ujg") List<Game> ujg);

}
