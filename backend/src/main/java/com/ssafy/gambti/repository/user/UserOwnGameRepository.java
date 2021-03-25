package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserOwnGame;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOwnGameRepository extends JpaRepository<UserOwnGame, Long> {
}
