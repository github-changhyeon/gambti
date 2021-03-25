package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserBanGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBanGameRepository extends JpaRepository<UserBanGame, Long> {
}
