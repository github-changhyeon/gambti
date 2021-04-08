package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserJoinGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserJoinGameRepository extends JpaRepository<UserJoinGame, Long> {
    int countByGameId(Long gameId);
    boolean existsByUserId(String uid);
    boolean existsByUserIdAndGameId(String uid, Long gameId);
    int deleteByUserIdAndGameId(String uid, long gameId);
    List<UserJoinGame> findByUserId(String uid);
}
