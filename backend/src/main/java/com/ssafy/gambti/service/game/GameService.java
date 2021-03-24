package com.ssafy.gambti.service.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.dto.game.GameDto;
import com.ssafy.gambti.dto.game.GameSimpleDto;
import com.ssafy.gambti.repository.game.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    public GameDto gameDetail(Long gameId) {

        Optional<Game> gameDetail = gameRepository.findById(gameId);
        if(gameDetail.isPresent()) {
            return GameDto.of(gameDetail.orElseGet(Game::new));
        }
        else{
            return null;
        }
    }
    @Transactional(readOnly = true)
    public Page<GameSimpleDto> findAllGames(Pageable pageable) {
        return gameRepository.findAll(pageable).map(GameSimpleDto::new);
    }
}
