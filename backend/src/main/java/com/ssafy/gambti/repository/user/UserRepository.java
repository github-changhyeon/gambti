package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.domain.user.UserMBTI;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Page<User> findByNicknameContaining(String nickname, Pageable pageable);

    Optional<User> findById(String userId);

    @Query("SELECT u FROM User u WHERE u.mbti IN :recommends ORDER BY rand()")
    List<User> findByMbtiIn(@Param("recommends") List<UserMBTI> recommendMbtiList);


}
