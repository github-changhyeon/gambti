package com.ssafy.gambti.repository.game;

import com.ssafy.gambti.domain.game.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Page<Game> findAll(Pageable pageable);

    Page<Game> findByGameGenres_genreId(Long genreId, Pageable pageable);

    Page<Game> findByAppNameContaining(String appName, Pageable pageable);

}
