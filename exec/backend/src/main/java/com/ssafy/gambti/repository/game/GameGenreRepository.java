package com.ssafy.gambti.repository.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.game.GameGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GameGenreRepository extends JpaRepository<GameGenre, Long> {

    boolean existsByGameAndGenreId(Game game, long genreId);

}
