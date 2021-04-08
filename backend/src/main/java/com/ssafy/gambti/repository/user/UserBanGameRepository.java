package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.domain.user.UserBanGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBanGameRepository extends JpaRepository<UserBanGame, Long> {

    boolean existsByUserAndGame(User user, Game game);

}
