package com.ssafy.gambti.repository.user;

import com.ssafy.gambti.domain.mapping.Friend;
import com.ssafy.gambti.domain.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends CrudRepository<Friend, Long> {

    Optional<Friend> findByFromAndTo(User from, User to);

    Optional<Friend> findByFromAndIsApproved(User from, boolean isApproved);

    Optional<Friend> findByToAndIsApproved(User to, boolean isApproved);

    List<Friend> findByFrom(User from);

}
