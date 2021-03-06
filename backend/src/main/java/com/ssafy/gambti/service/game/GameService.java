package com.ssafy.gambti.service.game;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import com.ssafy.gambti.domain.game.Game;
import com.ssafy.gambti.domain.user.*;
import com.ssafy.gambti.dto.game.GameDetailRes;
import com.ssafy.gambti.dto.game.GameRecommendRes;
import com.ssafy.gambti.dto.game.GameSimpleRes;
import com.ssafy.gambti.dto.game.JoinGamesRes;
import com.ssafy.gambti.exception.GameListException;
import com.ssafy.gambti.repository.game.GameGenreRepository;
import com.ssafy.gambti.repository.game.GameRepository;
import com.ssafy.gambti.repository.user.*;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final GameGenreRepository gameGenreRepository;
    private final UserJoinGameRepository userJoinGameRepository;
    private final UserOwnGameRepository userOwnGameRepository;
    private final UserBanGameRepository userBanGameRepository;
    private final SecurityService securityService;
    private final FirebaseTokenUtils firebaseTokenUtils;
    private final UserRecommendGameRepository userRecommendGameRepository;
    private final UserRecommendGameInitRepository userRecommendGameInitRepository;

    public User getLoginUser(HttpServletRequest httpServletRequest){
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;

        User loginUser = null;

        try {
            if(token!=null){
                //2.1 ????????? ???????????????.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //2.2 uid??? ???????????????.
                String loginUserId = decodedToken.getUid();
                //2.3 ????????? userId??? ????????? ????????????.
//                fromUser = userRepository.findUserById(fromUserId);
                loginUser = userRepository.findById(loginUserId).get();
            }
        }
        // 3. ????????? ??????????????? false
        catch (FirebaseAuthException e){
            logger.error("Firebase Exception : ", e.getLocalizedMessage());
        }

        return loginUser;
    }

    public GameDetailRes gameDetail(Long gameId, HttpServletRequest httpServletRequest) {

        FirebaseToken token = firebaseTokenUtils.decodedToken(httpServletRequest);
        Optional<Game> gameDetail = gameRepository.findById(gameId);
        if(gameDetail.isPresent()) {
            //GameDetail??? ????????? ???????????? ????????????.
            GameDetailRes gameDetailRes = GameDetailRes.of(gameDetail.orElseGet(Game::new));
            //????????? ????????? ?????? ?????????.
            gameDetailRes.setJoinUserCount(userJoinGameRepository.countByGameId(gameId));
            //????????? ???????????? ????????? ????????? ???????????? ?????????.
            if(token!=null) {

                //?????? ????????? ????????? ?????? ???????????? ????????????.
                gameDetailRes.setOwned(userOwnGameRepository.existsByUserId(token.getUid()));
                //????????? ?????? ???????????? ?????? ???????????? ????????????.
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
        //1. ?????? ?????? ?????? => ????????? ???????????? ????????????
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;
        Page<GameSimpleRes> gameSimpleResPage = null;

        //2. ?????? ???????????? ???????????? ????????????.
        if(genreId==0) {
            gameSimpleResPage = gameRepository.findAll(pageable).map(GameSimpleRes::new);
        }
        else{
            gameSimpleResPage = gameRepository.findByGameGenres_genreId(genreId, pageable).map(GameSimpleRes::new);
        }
        //3. ?????? ???????????? ????????? ??????.
        for (GameSimpleRes gspp : gameSimpleResPage.getContent()) {
            //4. ?????? ??????????????? ???????????? ?????? ?????? ??? ???????????? set????????????.
            gspp.setJoinUserCount(userJoinGameRepository.countByGameId(gspp.getGameId()));
            if(token!=null){
                try {
                    //5. ????????? ???????????????.
                    decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                    //6. uid??? ???????????????.
                    String uid = decodedToken.getUid();
                    //7. ?????? ????????? ????????? ?????? ???????????? ????????????.
                    gspp.setOwned(userOwnGameRepository.existsByUserId(uid));
                    //8. ????????? ?????? ???????????? ?????? ???????????? ????????????.
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

        //1. ?????? ?????? ?????? => ????????? ???????????? ????????????
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;

        if(token!=null){
            try {
                //3. ????????? ???????????????.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //4. uid??? ???????????????.
                String uid = decodedToken.getUid();

                CollectionReference joinGamesRef = db.collection("users").document(uid).collection("joinGames");

                //5. ????????? ???????????? ????????????
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
                    logger.info("????????????");
                }
                else{
                    //6. ???????????? ????????? ?????? ??????
                    boolean res = false;
                    if(userJoinGameRepository.deleteByUserIdAndGameId(uid, gameId) == 1){
                        res = true;
                        joinGamesRef.document(Long.toString(gameId)).delete();
                        logger.info("?????????");
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

    public Page<GameSimpleRes> searchGameByAppName(String word, Pageable pageable, HttpServletRequest httpServletRequest) {

        //1. ?????? ?????? ?????? => ????????? ???????????? ????????????
        String token = securityService.getBearerToken(httpServletRequest);
        FirebaseToken decodedToken = null;

        //2. ???????????? ????????? ????????? ???????????? ?????? ????????? ????????? Page<GameSimpleRes>??? ?????????.
        Page<GameSimpleRes> gameSimpleResPage = gameRepository.findByAppNameContaining(word, pageable).map(GameSimpleRes::new);;

        //3. ?????? ???????????? ????????? ??????.
        for (GameSimpleRes gspp : gameSimpleResPage.getContent()) {
            //4. ?????? ??????????????? ???????????? ?????? ?????? ??? ???????????? set????????????.
            gspp.setJoinUserCount(userJoinGameRepository.countByGameId(gspp.getGameId()));
            if(token!=null){
                try {
                    //5. ????????? ???????????????.
                    decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                    //6. uid??? ???????????????.
                    String uid = decodedToken.getUid();
                    //7. ?????? ????????? ????????? ?????? ???????????? ????????????.
                    gspp.setOwned(userOwnGameRepository.existsByUserId(uid));
                    //8. ????????? ?????? ???????????? ?????? ???????????? ????????????.
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

    public List<GameSimpleRes> joinGame(String userId, HttpServletRequest httpServletRequest) {
        User loginUser = getLoginUser(httpServletRequest);
        User profileUser = userRepository.findById(userId).get();;

        List<UserJoinGame> profileUserjoinGames = profileUser.getUserJoinGames();
        List<GameSimpleRes> joinGamesResList;

        if ( loginUser != null) {
            joinGamesResList = profileUserjoinGames.stream()
                    .map(userJoinGame -> {
                        GameSimpleRes gameSimpleRes = new GameSimpleRes(userJoinGame.getGame());
                        gameSimpleRes.setJoined(userJoinGameRepository.existsByUserIdAndGameId(loginUser.getId(), userJoinGame.getGame().getId()));
                        gameSimpleRes.setJoinUserCount(userJoinGameRepository.countByGameId(userJoinGame.getGame().getId()));
                        gameSimpleRes.setOwned(userOwnGameRepository.existsByUserId(loginUser.getId()));
                        return gameSimpleRes;
                    }).collect(Collectors.toList());

            return joinGamesResList;
        } else {
            joinGamesResList = profileUserjoinGames.stream()
                    .map(userJoinGame -> {
                        GameSimpleRes gameSimpleRes = new GameSimpleRes(userJoinGame.getGame());
                        gameSimpleRes.setJoinUserCount(userJoinGameRepository.countByGameId(userJoinGame.getGame().getId()));
                        return gameSimpleRes;
                    }).collect(Collectors.toList());
            return joinGamesResList;
        }
    }

    @Transactional(readOnly = true)
    public Page<GameRecommendRes> gameRecommends(Pageable pageable, HttpServletRequest httpServletRequest) {
        // 1. ?????? ???????????? ????????? ????????????
        User loginUser = getLoginUser(httpServletRequest);

        // 2. ?????? ????????? Join????????? Ban??? ????????? ???????????? Set??? ?????? ???????????? ????????? ????????? ?????????.
        // 2.1. Join, Ban ?????? ????????????
        List<Game> userJoinGames = loginUser.getUserJoinGames().stream().map(userJoinGame -> userJoinGame.getGame()).collect(Collectors.toList());
        List<Game> userBanGames = loginUser.getUserBanGames().stream().map(userBanGame -> userBanGame.getGame()).collect(Collectors.toList());

        // 2.2. Set ?????? ??? Join, Ban ????????? ?????? ???????????? ????????? ????????? ????????????.
        Set<Game> exclusiveGames = new HashSet<>();

        exclusiveGames.addAll(userJoinGames);
        exclusiveGames.addAll(userBanGames);

        // ?????? ?????? ??? gameRecommendRes??? ?????? ????????????.
        Page<GameRecommendRes> gameRecommendRes;

        // UserRecommendGame ???????????? ????????? ???????????? ????????? ????????? ??????????????? ????????? ?????????
        // ????????? UserRecommendGameInit ???????????? ?????? MBTI??? ????????? ?????????????????? ?????? ?????? ?????? ????????? ?????????.
        if (userRecommendGameRepository.existsByUser(loginUser)) {
            Page<UserRecommendGame> userRecommendGames;

            // 3. ????????? ????????? ????????? userRecommendGame ???????????? ??? ???????????? ????????? ????????????
            // ????????? ????????? ????????? userRecommendGame ????????? ?????? ????????? ????????? ?????? ??? ????????? ????????????.
            if (exclusiveGames.isEmpty()) {
                userRecommendGames = userRecommendGameRepository.findByUserId(loginUser.getId(), pageable);
            } else {
                userRecommendGames = userRecommendGameRepository.findByUserIdAndExclusivesNotIn(loginUser.getId(), exclusiveGames, pageable);
            }

            gameRecommendRes = userRecommendGames
                    .map(userRecommendGame -> GameRecommendRes.builder()
                            .gameId(userRecommendGame.getGame().getId())
                            .appName(userRecommendGame.getGame().getAppName())
                            .backgroundImagePath(userRecommendGame.getGame().getBackgroundImagePath())
                            .logoImagePath(userRecommendGame.getGame().getLogoImagePath())
                            .videoUrl(userRecommendGame.getGame().getVideoUrl())
                            .isJoined(userJoinGameRepository.existsByUserIdAndGameId(userRecommendGame.getUser().getId(), userRecommendGame.getGame().getId()))
                            .isOwned(userOwnGameRepository.existsByUserId(userRecommendGame.getUser().getId()))
                            .joinUserCount(userRecommendGame.getGame().getUserJoinGames().size())
                            .rating(userRecommendGame.getRating())
                            .build());
        } else {
            Page<UserRecommendGameInit> userRecommendGames;

            // 3. ????????? ????????? ????????? userRecommendGame ???????????? ??? ???????????? ????????? ????????????
            // ????????? ????????? ????????? userRecommendGame ????????? ?????? ????????? ????????? ?????? ??? ????????? ????????????.
            if (exclusiveGames.isEmpty()) {
                userRecommendGames = userRecommendGameInitRepository.findByMbtiAndGender(loginUser.getMbti(), loginUser.getGender(), pageable);
            } else {
                userRecommendGames = userRecommendGameInitRepository.findByUserIdAndExclusivesNotIn(loginUser.getMbti(), loginUser.getGender(), exclusiveGames, pageable);
            }

            gameRecommendRes = userRecommendGames
                    .map(userRecommendGame -> GameRecommendRes.builder()
                            .gameId(userRecommendGame.getGame().getId())
                            .appName(userRecommendGame.getGame().getAppName())
                            .backgroundImagePath(userRecommendGame.getGame().getBackgroundImagePath())
                            .logoImagePath(userRecommendGame.getGame().getLogoImagePath())
                            .videoUrl(userRecommendGame.getGame().getVideoUrl())
                            .isJoined(userJoinGameRepository.existsByUserIdAndGameId(loginUser.getId(), userRecommendGame.getGame().getId()))
                            .isOwned(userOwnGameRepository.existsByUserId(loginUser.getId()))
                            .joinUserCount(userRecommendGame.getGame().getUserJoinGames().size())
                            .rating(userRecommendGame.getRating())
                            .build());
        }

        return gameRecommendRes;
    }

    public List<GameRecommendRes> gameGenreRecommends(Long genreId, HttpServletRequest httpServletRequest) {
        // 1. ?????? ???????????? ????????? ????????????
        User loginUser = getLoginUser(httpServletRequest);

        // 2. ?????? ????????? Join????????? Ban??? ????????? ???????????? Set??? ?????? ???????????? ????????? ????????? ?????????.
        // 2.1. Join, Ban ?????? ????????????
        List<Game> userJoinGames = loginUser.getUserJoinGames().stream().map(userJoinGame -> userJoinGame.getGame()).collect(Collectors.toList());
        List<Game> userBanGames = loginUser.getUserBanGames().stream().map(userBanGame -> userBanGame.getGame()).collect(Collectors.toList());

        // 2.2. Set ?????? ??? Join, Ban ????????? ?????? ???????????? ????????? ????????? ????????????.
        Set<Game> exclusiveGames = new HashSet<>();

        exclusiveGames.addAll(userJoinGames);
        exclusiveGames.addAll(userBanGames);

        List<GameRecommendRes> gameRecommendRes = new ArrayList<>();

        // 3. ????????? ????????? ????????? userRecommendGame ???????????? ??? ????????????
        // ????????? ????????? ????????? userRecommendGame ????????? ?????? ????????? ????????? ?????? ??????.

        if (userRecommendGameRepository.existsByUser(loginUser)) {
            List<UserRecommendGame> userRecommendGames;

            if (exclusiveGames.isEmpty()) {
                userRecommendGames = userRecommendGameRepository.findByUserId(loginUser.getId());
            } else {
                userRecommendGames = userRecommendGameRepository.findByUserIdAndExclusivesNotIn(loginUser.getId(), exclusiveGames);
            }

            gameRecommendRes = userRecommendGames.stream().parallel()
                    .filter(userRecommendGame -> {
                        if (genreId == 0) {
                            return true;
                        }
                        return gameGenreRepository.existsByGameAndGenreId(userRecommendGame.getGame(), genreId);
                    })
                    .limit(15)
                    .map(userRecommendGame -> GameRecommendRes.builder()
                            .gameId(userRecommendGame.getGame().getId())
                            .appName(userRecommendGame.getGame().getAppName())
                            .backgroundImagePath(userRecommendGame.getGame().getBackgroundImagePath())
                            .logoImagePath(userRecommendGame.getGame().getLogoImagePath())
                            .videoUrl(userRecommendGame.getGame().getVideoUrl())
                            .isJoined(userJoinGameRepository.existsByUserIdAndGameId(userRecommendGame.getUser().getId(), userRecommendGame.getGame().getId()))
                            .isOwned(userOwnGameRepository.existsByUserId(userRecommendGame.getUser().getId()))
                            .joinUserCount(userRecommendGame.getGame().getUserJoinGames().size())
                            .rating(userRecommendGame.getRating())
                            .build()).collect(Collectors.toList());
        } else {
            List<UserRecommendGameInit> userRecommendGames;

            // 3. ????????? ????????? ????????? userRecommendGame ???????????? ??? ???????????? ????????? ????????????
            // ????????? ????????? ????????? userRecommendGame ????????? ?????? ????????? ????????? ?????? ??? ????????? ????????????.
            if (exclusiveGames.isEmpty()) {
                userRecommendGames = userRecommendGameInitRepository.findByMbtiAndGender(loginUser.getMbti(), loginUser.getGender());
            } else {
                userRecommendGames = userRecommendGameInitRepository.findByUserIdAndExclusivesNotIn(loginUser.getMbti(), loginUser.getGender(), exclusiveGames);
            }

            gameRecommendRes = userRecommendGames.stream().parallel()
                    .filter(userRecommendGame -> {
                        if (genreId == 0) {
                            return true;
                        }
                        return gameGenreRepository.existsByGameAndGenreId(userRecommendGame.getGame(), genreId);
                    })
                    .limit(15)
                    .map(userRecommendGame -> GameRecommendRes.builder()
                            .gameId(userRecommendGame.getGame().getId())
                            .appName(userRecommendGame.getGame().getAppName())
                            .backgroundImagePath(userRecommendGame.getGame().getBackgroundImagePath())
                            .logoImagePath(userRecommendGame.getGame().getLogoImagePath())
                            .videoUrl(userRecommendGame.getGame().getVideoUrl())
                            .isJoined(userJoinGameRepository.existsByUserIdAndGameId(loginUser.getId(), userRecommendGame.getGame().getId()))
                            .isOwned(userOwnGameRepository.existsByUserId(loginUser.getId()))
                            .joinUserCount(userRecommendGame.getGame().getUserJoinGames().size())
                            .rating(userRecommendGame.getRating())
                            .build()).collect(Collectors.toList());
        }
        
        return gameRecommendRes;
    }

    public boolean banFromGameRecommend(Long gameId, HttpServletRequest httpServletRequest) {
        User loginUser = getLoginUser(httpServletRequest);
        Game banTargetGame = gameRepository.findById(gameId).get();

        if (userBanGameRepository.existsByUserAndGame(loginUser, banTargetGame)) {
            throw new IllegalStateException("?????? ???????????? ????????? ???????????????.");
        }

        if (loginUser != null && banTargetGame != null) {
            // 2.1 UserBanFriend ???????????? ????????? ???????????? ?????? ?????? ????????? ??????.
            UserBanGame userBanGame = new UserBanGame(loginUser, banTargetGame);

            userBanGameRepository.save(userBanGame);
        } else {
            return false;
        }
        return true;
    }

//    public Page<Game> findGamesInGenre(Long genreId, Pageable pageable, HttpServletRequest httpServletRequest) {
//        //1. ?????? ?????? ?????? => ????????? ???????????? ????????????
//        String token = securityService.getBearerToken(httpServletRequest);
//        FirebaseToken decodedToken = null;
//    }
}
