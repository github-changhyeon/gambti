import { restApi, getConfig } from "./index";

function getRecommendedGames(genreId, success, fail) {
  restApi().get(`games/recommends/${genreId}`).then(success).catch(fail);
}

function joinAndLeave(gameId, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .post(`games/joinLeave/${gameId}`, {}, config)
    .then(success)
    .catch(fail);
}

function getGamesOrderBy(params, success, fail) {
  restApi()
    .get(
      `/games/find?genreId=${params.genreId}&page=${params.pageNum}&size=${params.size}&direction=DESC&colName=metascore`
    )
    .then(success)
    .catch(fail);
}

export { getRecommendedGames, joinAndLeave, getGamesOrderBy };
