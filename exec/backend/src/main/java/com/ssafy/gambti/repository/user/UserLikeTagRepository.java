package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.user.UserLikeTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLikeTagRepository extends CrudRepository<UserLikeTag, Long> {
}