package com.ssafy.gambti.service.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.dto.game.GameDto;
import com.ssafy.gambti.repository.game.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;


    public Optional<Game> gameDetail(Long gameId) {
        return gameRepository.findById(gameId);
    }
}
