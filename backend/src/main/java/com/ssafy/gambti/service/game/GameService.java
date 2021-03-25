package com.ssafy.gambti.service.game;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.UserJoinGame;
import com.ssafy.gambti.dto.game.GameDetailRes;
import com.ssafy.gambti.dto.game.GameSimpleRes;
import com.ssafy.gambti.repository.game.GameRepository;
import com.ssafy.gambti.repository.genre.GenreRepository;
import com.ssafy.gambti.repository.user.UserBanGameRepository;
import com.ssafy.gambti.repository.user.UserJoinGameRepository;
import com.ssafy.gambti.repository.user.UserOwnGameRepository;
import com.ssafy.gambti.repository.user.UserRepository;
import com.ssafy.gambti.service.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private final UserJoinGameRepository userJoinGameRepository;
    private final UserOwnGameRepository userOwnGameRepository;
    private final UserBanGameRepository userBanGameRepository;
    private final SecurityService securityService;


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
    public Page<GameSimpleRes> findGames(Long genreId, Pageable pageable, HttpServletRequest httpServletRequest) {
        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        Page<GameSimpleRes> gameSimpleResPage = null;

        //2. 장르 아이디로 장르까지 판단한다.
        if(genreId==0) {
            gameSimpleResPage = gameRepository.findAll(pageable).map(GameSimpleRes::new);
        }
        else{
            gameSimpleResPage = gameRepository.findByGameGenres_genreId(genreId, pageable).map(GameSimpleRes::new);
        }
        //3. 유저 카운트를 가지고 온다.
        for (GameSimpleRes gspp : gameSimpleResPage.getContent()) {
            //4. 게임 커뮤니티에 참여하고 있는 사람 수 받아와서 set시켜준다.
            gspp.setJoinUserCount(userJoinGameRepository.countByGameId(gspp.getGameId()));
            if(token!=null){

                try {
                    //5. 토큰을 디코딩한다.
                    decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                    //6. uid를 가지고온다.
                    String uid = decodedToken.getUid();
                    //7. 해당 유저가 가지고 있는 게임인지 확인한다.
                    gspp.setOwned(userOwnGameRepository.existsByUserId(uid));
                    //8. 유저가 이미 조인하고 있는 게임인지 확인한다.
                    gspp.setJoined(userJoinGameRepository.existsByUserId(uid));
                }
                catch (FirebaseAuthException e){
                    logger.error("Firebase Exception : ", e.getLocalizedMessage());
                    return null;
                }
            }
        }
        return gameSimpleResPage;
    }

    @Transactional
    public boolean joinOrLeaveToGame(long gameId, HttpServletRequest httpServletRequest) {
        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        if(token!=null){
            try {
                //3. 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //4. uid를 가지고온다.
                String uid = decodedToken.getUid();
                //5. 만약에 존재하지 않는다면
                if(!userJoinGameRepository.existsByUserId(uid)){
                    userJoinGameRepository.save(new UserJoinGame(
                            userRepository.findById(uid).orElseThrow(NoSuchElementException::new),
                            gameRepository.findById(gameId).orElseThrow(NoSuchElementException::new)));
                }
                else{
                    //6. 존재하고 있다면 탈퇴 시킴
                    return userJoinGameRepository.deleteByUserId(uid) == 1? true : false;
                }
            }
            catch (FirebaseAuthException e){
                logger.error("Firebase Exception : ", e.getLocalizedMessage());
                return false;
            }
        }
        return true;
    }
//    public Page<Game> findGamesInGenre(Long genreId, Pageable pageable, HttpServletRequest httpServletRequest) {
//        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
//        String token = securityService.getBearerToken(httpServletRequest);
//        FirebaseToken decodedToken = null;
//
//
//
//    }
}
