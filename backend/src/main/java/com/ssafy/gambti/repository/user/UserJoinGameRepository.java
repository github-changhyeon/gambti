package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserJoinGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserJoinGameRepository extends JpaRepository<UserJoinGame, Long> {
}
