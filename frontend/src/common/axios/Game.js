import { restApi, getConfig } from "./index";

function getRecommendedGames(params, success, fail) {
  if (params.isLogin) {
    const token = localStorage.getItem("idToken");
    const config = getConfig(token);
    restApi()
      .get(
        `/games/recommends?page=${params.pageNum}&size=${params.size}&direction=DESC&colName=rating`,
        config
      )
      .then(success)
      .catch(fail);
  } else {
    restApi()
      .get(
        `/games/find?genreId=${params.genreId}&page=${params.pageNum}&size=${params.size}&direction=DESC&colName=metascore`
      )
      .then(success)
      .catch(fail);
  }
}
function getRecommendedGenreGames(params, success, fail) {
  if (params.isLogin) {
    const token = localStorage.getItem("idToken");
    const config = getConfig(token);
    restApi()
      .get(`/games/recommends/${params.genreId}`, config)
      .then(success)
      .catch(fail);
  } else {
    restApi()
      .get(
        `/games/find?genreId=${params.genreId}&page=${params.pageNum}&size=${params.size}&direction=DESC&colName=metascore`
      )
      .then(success)
      .catch(fail);
  }
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
      `/games/find?genreId=${params.genreId}&page=${params.pageNum}&size=${params.size}&direction=${params.direction}&colName=${params.colName}`,
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

function deleteGame(gameId, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .post(`games/recommends/${gameId}/ban`, {}, config)
    .then(success)
    .catch(fail);
}

export {
  getRecommendedGames,
  getRecommendedGenreGames,
  joinAndLeave,
  getGamesOrderBy,
  getGameDetail,
  deleteGame,
};
