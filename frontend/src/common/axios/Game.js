import { restApi, getConfig } from "./index";

function getRecommendedGames(genreId, success, fail) {
  restApi().get(`/games/recommends/${genreId}`).then(success).catch(fail);
}

function joinAndLeave(gameId, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .post(`/games/joinLeave/${gameId}`, {}, token ? config : null)
    .then(success)
    .catch(fail);
}

function getGamesOrderBy(params, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get(
      `/games/find?genreId=${params.genreId}&page=${params.pageNum}&size=${params.size}&direction=DESC&colName=metascore`,
      token ? config : null
    )
    .then(success)
    .catch(fail);
}

function getGameDetail(gameId, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get(`/games/detail/${gameId}`, token ? config : null)
    .then(success)
    .catch(fail);
}

export { getRecommendedGames, joinAndLeave, getGamesOrderBy, getGameDetail };
