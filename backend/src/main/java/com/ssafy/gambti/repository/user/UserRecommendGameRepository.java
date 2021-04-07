package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.domain.user.UserRecommendGame;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface UserRecommendGameRepository extends JpaRepository<UserRecommendGame, Long> {

    boolean existsByUser(User user);

    Page<UserRecommendGame> findByUserId(String userId, Pageable pageable);

    List<UserRecommendGame> findByUserId(String userId);

    @Query("SELECT urg FROM UserRecommendGame urg WHERE urg.user.id = :userId AND urg.game NOT IN :exclusives")
    Page<UserRecommendGame> findByUserIdAndExclusivesNotIn(@Param("userId") String userId, @Param("exclusives") Set<Game> Exclusives, Pageable pageable);

    @Query("SELECT urg FROM UserRecommendGame urg WHERE urg.user.id = :userId AND urg.game NOT IN :exclusives")
    List<UserRecommendGame> findByUserIdAndExclusivesNotIn(@Param("userId") String userId, @Param("exclusives") Set<Game> Exclusives);

}
