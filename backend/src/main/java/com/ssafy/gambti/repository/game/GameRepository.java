package com.ssafy.gambti.repository.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Page<Game> findAll(Pageable pageable);
    Page<Game> findByGameGenres_genreId(Long genreId, Pageable pageable);
    Page<Game> findByAppNameContaining(String appName, Pageable pageable);

    @Query(value = "SELECT g.game_id, g.app_name, g.logo_image_path, g.background_image_path, g.video_url FROM game_genre gg join game g ON gg.game_id = g.game_id ORDER BY RAND() LIMIT 20", nativeQuery = true)
    List<Object[]> findAllRecommendGamesOrderByRandom();

    @Query(value = "SELECT g.game_id, g.app_name, g.logo_image_path, g.background_image_path, g.video_url FROM game_genre gg join game g ON gg.game_id = g.game_id WHERE gg.genre_id=?1 ORDER BY RAND() LIMIT 20", nativeQuery = true)
    List<Object[]> findRecommendGamesOrderByRandom(Long genreId);


}
