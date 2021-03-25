package com.ssafy.gambti.service.game;

import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.dto.game.GameDetailRes;
import com.ssafy.gambti.dto.game.GameSimpleRes;
import com.ssafy.gambti.repository.game.GameRepository;
import com.ssafy.gambti.repository.user.UserRepository;
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
    private final UserRepository userRepository;

    public GameDetailRes gameDetail(Long gameId) {

        Optional<Game> gameDetail = gameRepository.findById(gameId);
        if(gameDetail.isPresent()) {
            return GameDetailRes.of(gameDetail.orElseGet(Game::new));
        }
        else{
            return null;
        }
    }
    @Transactional(readOnly = true)
    public Page<GameSimpleRes> findAllGames(Pageable pageable) {
        Page<GameSimpleRes> gameSimpleResPage =  gameRepository.findAll(pageable).map(GameSimpleRes::new);
        //1. 유저 카운트를 가지고 온다.
        for (GameSimpleRes gspp : gameSimpleResPage.getContent()) {
//            gspp.setJoinUserCount(.count());
//            gspp.setJoined(userRepository.existsBy());
//            gspp.setOwned(userRepository.existsBy());
        }
        return gameSimpleResPage;
    }
}
