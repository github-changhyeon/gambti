package com.ssafy.gambti.repository.user;
import com.ssafy.gambti.domain.mapping.Friend;
import com.ssafy.gambti.domain.user.User;
import com.ssafy.gambti.domain.user.UserBanFriend;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserBanFriendRepository extends CrudRepository<UserBanFriend, Long> {

    List<UserBanFriend> findByFrom(User from);

}
