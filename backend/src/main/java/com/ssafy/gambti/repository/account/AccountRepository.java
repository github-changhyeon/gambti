package com.ssafy.gambti.repository.account;

import com.ssafy.gambti.domain.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface AccountRepository extends CrudRepository<User, Long> {
    @Transactional
    int deleteById(String uid);
}
