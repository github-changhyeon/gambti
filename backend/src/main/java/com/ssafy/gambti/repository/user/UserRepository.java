package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    public Page<User> findByNicknameContaining(String nickname, Pageable pageable);

}
