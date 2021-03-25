package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserJoinGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserJoinGameRepository extends JpaRepository<UserJoinGame, Long> {
    int countByGameId(Long gameId);
    boolean existsByUserId(String uid);
    int deleteByUserId(String uid);
}
