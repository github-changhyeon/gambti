package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserOwnGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOwnGameRepository extends JpaRepository<UserOwnGame, Long> {
    boolean existsByUserId(String uid);
}
