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
                //2.1 토큰을 디코딩한다.
                decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
                //2.2 uid를 가지고온다.
                String loginUserId = decodedToken.getUid();
                //2.3 각각의 userId로 객체를 할당한다.
//                fromUser = userRepository.findUserById(fromUserId);
                loginUser = userRepository.findById(loginUserId).get();
            }
        }
        // 3. 중간에 애러났으면 false
        catch (FirebaseAuthException e){
            logger.error("Firebase Exception : ", e.getLocalizedMessage());
        }

        return loginUser;
    }

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

    @Transactional(readOnly = true)
    public Page<GameRecommendRes> gameRecommends(Pageable pageable, HttpServletRequest httpServletRequest) {
        // 1. 현재 로그인된 유저를 가져온다
        User loginUser = getLoginUser(httpServletRequest);

        // 2. 해당 유저가 Join하거나 Ban한 게임을 불러와서 Set에 담아 추천에서 배제할 목록을 만든다.
        // 2.1. Join, Ban 게임 불러오기
        List<Game> userJoinGames = loginUser.getUserJoinGames().stream().map(userJoinGame -> userJoinGame.getGame()).collect(Collectors.toList());
        List<Game> userBanGames = loginUser.getUserBanGames().stream().map(userBanGame -> userBanGame.getGame()).collect(Collectors.toList());

        // 2.2. Set 선언 후 Join, Ban 목록을 담아 중복될지 모르는 항목을 제거한다.
        Set<Game> exclusiveGames = new HashSet<>();

        exclusiveGames.addAll(userJoinGames);
        exclusiveGames.addAll(userBanGames);

        // 최종 반환 될 gameRecommendRes를 우선 선언한다.
        Page<GameRecommendRes> gameRecommendRes;

        // UserRecommendGame 테이블에 분석된 데이터가 있다면 분석된 추천게임을 보여줄 것이고
        // 없다면 UserRecommendGameInit 테이블에 담긴 MBTI와 성별로 클러스터링된 추천 게임 셋을 보여줄 것이다.
        if (userRecommendGameRepository.existsByUser(loginUser)) {
            Page<UserRecommendGame> userRecommendGames;

            // 3. 배제할 목록이 없다면 userRecommendGame 리스트를 다 가져와서 페이징 처리하고
            // 배제할 목록이 있으면 userRecommendGame 리스트 중에 배제할 게임을 제거 후 페이징 처리한다.
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

            // 3. 배제할 목록이 없다면 userRecommendGame 리스트를 다 가져와서 페이징 처리하고
            // 배제할 목록이 있으면 userRecommendGame 리스트 중에 배제할 게임을 제거 후 페이징 처리한다.
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
        // 1. 현재 로그인된 유저를 가져온다
        User loginUser = getLoginUser(httpServletRequest);

        // 2. 해당 유저가 Join하거나 Ban한 게임을 불러와서 Set에 담아 추천에서 배제할 목록을 만든다.
        // 2.1. Join, Ban 게임 불러오기
        List<Game> userJoinGames = loginUser.getUserJoinGames().stream().map(userJoinGame -> userJoinGame.getGame()).collect(Collectors.toList());
        List<Game> userBanGames = loginUser.getUserBanGames().stream().map(userBanGame -> userBanGame.getGame()).collect(Collectors.toList());

        // 2.2. Set 선언 후 Join, Ban 목록을 담아 중복될지 모르는 항목을 제거한다.
        Set<Game> exclusiveGames = new HashSet<>();

        exclusiveGames.addAll(userJoinGames);
        exclusiveGames.addAll(userBanGames);

        List<GameRecommendRes> gameRecommendRes = new ArrayList<>();

        // 3. 배제할 목록이 없다면 userRecommendGame 리스트를 다 가져오고
        // 배제할 목록이 있으면 userRecommendGame 리스트 중에 배제할 게임을 제거 한다.

        if (userRecommendGameRepository.existsByUser(loginUser)) {
            List<UserRecommendGame> userRecommendGames;

            if (exclusiveGames.isEmpty()) {
                userRecommendGames = userRecommendGameRepository.findByUserId(loginUser.getId());
            } else {
                userRecommendGames = userRecommendGameRepository.findByUserIdAndExclusivesNotIn(loginUser.getId(), exclusiveGames);
            }

            gameRecommendRes = userRecommendGames.stream().parallel()
                    .filter(userRecommendGame -> gameGenreRepository.existsByGameAndGenreId(userRecommendGame.getGame(), genreId))
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

            // 3. 배제할 목록이 없다면 userRecommendGame 리스트를 다 가져와서 페이징 처리하고
            // 배제할 목록이 있으면 userRecommendGame 리스트 중에 배제할 게임을 제거 후 페이징 처리한다.
            if (exclusiveGames.isEmpty()) {
                userRecommendGames = userRecommendGameInitRepository.findByMbtiAndGender(loginUser.getMbti(), loginUser.getGender());
            } else {
                userRecommendGames = userRecommendGameInitRepository.findByUserIdAndExclusivesNotIn(loginUser.getMbti(), loginUser.getGender(), exclusiveGames);
            }

            gameRecommendRes = userRecommendGames.stream().parallel()
                    .filter(userRecommendGame -> gameGenreRepository.existsByGameAndGenreId(userRecommendGame.getGame(), genreId))
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
            throw new IllegalStateException("이미 추천에서 삭제한 게임입니다.");
        }

        if (loginUser != null && banTargetGame != null) {
            // 2.1 UserBanFriend 테이블에 저장해 다음부터 추천 받지 않도록 한다.
            UserBanGame userBanGame = new UserBanGame(loginUser, banTargetGame);

            userBanGameRepository.save(userBanGame);
        } else {
            return false;
        }
        return true;
    }

//    public Page<Game> findGamesInGenre(Long genreId, Pageable pageable, HttpServletRequest httpServletRequest) {
//        //1. 토큰 유무 확인 => 있으면 로그인한 사용자임
//        String token = securityService.getBearerToken(httpServletRequest);
//        FirebaseToken decodedToken = null;
//    }
}
