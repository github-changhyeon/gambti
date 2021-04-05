package com.ssafy.gambti.service.game;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.UserJoinGame;
import com.ssafy.gambti.dto.game.GameDetailRes;
import com.ssafy.gambti.dto.game.GameRecommendDto;
import com.ssafy.gambti.dto.game.GameSimpleRes;
import com.ssafy.gambti.dto.game.JoinGamesRes;
import com.ssafy.gambti.exception.GameListException;
import com.ssafy.gambti.repository.game.GameRepository;
import com.ssafy.gambti.repository.user.UserJoinGameRepository;
import com.ssafy.gambti.repository.user.UserOwnGameRepository;
import com.ssafy.gambti.repository.user.UserRepository;
import com.ssafy.gambti.service.security.SecurityService;
import com.ssafy.gambti.utils.FirebaseTokenUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final UserJoinGameRepository userJoinGameRepository;
    private final UserOwnGameRepository userOwnGameRepository;
    private final SecurityService securityService;
    private final FirebaseTokenUtils firebaseTokenUtils;

    public GameDetailRes gameDetail(Long gameId, HttpServletRequest httpServletRequest) {

        FirebaseToken token = firebaseTokenUtils.decodedToken(httpServletRequest);
        Optional<Game> gameDetail = gameRepository.findById(gameId);
        if(gameDetail.isPresent()) {
            //GameDetail에 필요한 데이터를 받아온다.
            GameDetailRes gameDetailRes = GameDetailRes.of(gameDetail.orElseGet(Game::new));
            //조인된 사람의 수를 구한다.
            gameDetailRes.setJoinUserCount(userJoinGameRepository.countByGameId(gameId));
            //토큰이 포함되어 있다면 유저에 정보까지 넣는다.
            if(token!=null) {

                //해당 유저가 가지고 있는 게임인지 확인한다.
                gameDetailRes.setOwned(userOwnGameRepository.existsByUserId(token.getUid()));
                //유저가 이미 조인하고 있는 게임인지 확인한다.
                gameDetailRes.setJoined(userJoinGameRepository.existsByUserIdAndGameId(token.getUid(), gameId));
            }
            return gameDetailRes;
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
                    gspp.setJoined(userJoinGameRepository.existsByUserIdAndGameId(uid, gspp.getGameId()));
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

        Firestore db = FirestoreClient.getFirestore();

        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;

        if(token!=null){
            try {
                //3. 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //4. uid를 가지고온다.
                String uid = decodedToken.getUid();

                CollectionReference joinGamesRef = db.collection("users").document(uid).collection("joinGames");

                //5. 만약에 존재하지 않는다면
                if(!userJoinGameRepository.existsByUserIdAndGameId(uid, gameId)){
                    userJoinGameRepository.save(new UserJoinGame(
                            userRepository.findById(uid).orElseThrow(GameListException::new),
                            gameRepository.findById(gameId).orElseThrow(GameListException::new)));
                    Optional<Game> game = gameRepository.findById(gameId);

                    Map<String, Object> document = new HashMap<>();
                    document.put("gameId", game.get().getId());
                    document.put("imgPath",game.get().getLogoImagePath());
                    document.put("timestamp", FieldValue.serverTimestamp());
                    joinGamesRef.document(Long.toString(gameId)).set(document);
                    logger.info("등록했음");
                }
                else{
                    //6. 존재하고 있다면 탈퇴 시킴
                    boolean res = false;
                    if(userJoinGameRepository.deleteByUserIdAndGameId(uid, gameId) == 1){
                        res = true;
                        joinGamesRef.document(Long.toString(gameId)).delete();
                        logger.info("지웠음");
                    }
                    return res;
                }
            }
            catch (FirebaseAuthException e){
                logger.error("Firebase Exception : ", e.getLocalizedMessage());
                return false;
            }
        }
        return true;
    }

    @Transactional(readOnly = true)
    public List<GameRecommendDto> gameRecommends(Long genreId, HttpServletRequest httpServletRequest) {
        //일딴 random으로 받아서 주자
        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        List<GameRecommendDto> gameRecommendResList = new ArrayList<>();
        List<Object[]> result;
        //2. 장르 아이디로 장르까지 판단한다.
        //TODO: size 데이터 받아서 설정하도록 해줘야 함
        if(genreId==0) {
            result = gameRepository.findAllRecommendGamesOrderByRandom();
            for (int i = 0; i<20; i++){
                gameRecommendResList.add(new GameRecommendDto(result.get(i)));
            }
        }
        else{
            result = gameRepository.findRecommendGamesOrderByRandom(genreId);
            for (int i = 0; i<20; i++){
                gameRecommendResList.add(new GameRecommendDto(result.get(i)));
            }
        }
        //3. 유저 카운트를 가지고 온다.
        for (GameRecommendDto grr : gameRecommendResList) {
            //4. 게임 커뮤니티에 참여하고 있는 사람 수 받아와서 set시켜준다.
            grr.setJoinUserCount(userJoinGameRepository.countByGameId(grr.getGameId()));
            if(token!=null){
                try {
                    //5. 토큰을 디코딩한다.
                    decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                    //6. uid를 가지고온다.
                    String uid = decodedToken.getUid();
                    //7. 해당 유저가 가지고 있는 게임인지 확인한다.
                    grr.setOwned(userOwnGameRepository.existsByUserId(uid));
                    //8. 유저가 이미 조인하고 있는 게임인지 확인한다.
                    grr.setJoined(userJoinGameRepository.existsByUserIdAndGameId(uid, grr.getGameId()));
                }
                catch (FirebaseAuthException e){
                    logger.error("Firebase Exception : ", e.getLocalizedMessage());
                    return null;
                }
            }
        }
        return gameRecommendResList;
    }

    public Page<GameSimpleRes> searchGameByAppName(String word, Pageable pageable, HttpServletRequest httpServletRequest) {

        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;

        //2. 사용자가 검색한 단어가 포함되는 게임 객체를 가져와 Page<GameSimpleRes>로 만든다.
        Page<GameSimpleRes> gameSimpleResPage = gameRepository.findByAppNameContaining(word, pageable).map(GameSimpleRes::new);;

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
                    gspp.setJoined(userJoinGameRepository.existsByUserIdAndGameId(uid, gspp.getGameId()));
                }
                catch (FirebaseAuthException e){
                    logger.error("Firebase Exception : ", e.getLocalizedMessage());
                    return null;
                }
            }
        }
        return gameSimpleResPage;

    }

    public List<JoinGamesRes> joinGame(HttpServletRequest httpServletRequest) {
        FirebaseToken token = firebaseTokenUtils.decodedToken(httpServletRequest);
        if(token != null){
            String uid = token.getUid();

            //찾아온 유저 no로 join한 게임 list를 가지고온다.
            List<UserJoinGame> joinGames = userJoinGameRepository.findByUserId(uid);
            List<JoinGamesRes> joinGamesResList = new ArrayList<>();
            for (UserJoinGame ujg : joinGames) {
                joinGamesResList.add(new JoinGamesRes(ujg.getGame()));
            }
            return joinGamesResList;
        }
        return null;
    }

    // TODO: 2021-03-26 추천 알고리즘 완성되면 추가해야 함 
//    public GameSimpleRes banFromGameRecommend(Long gameId, HttpServletRequest httpServletRequest) {
//
//    }
//    public Page<Game> findGamesInGenre(Long genreId, Pageable pageable, HttpServletRequest httpServletRequest) {
//        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
//        String token = securityService.getBearerToken(httpServletRequest);
//        FirebaseToken decodedToken = null;
//    }
}
