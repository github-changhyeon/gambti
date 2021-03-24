package com.ssafy.gambti.repository.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.dto.game.GameDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
}
