package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserRecommendGame;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRecommendGameRepository extends JpaRepository<UserRecommendGame, Long> {
    Page<UserRecommendGame> findByUserId(Long userId);
}
