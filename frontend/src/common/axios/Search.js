import { restApi, getConfig } from "./index";

function searchGames(params, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get(
      `/search/games/${params.word}?page=${params.pageNum}&size=${params.size}&direction=ASC&colName=${params.colName}`,
      token ? config : null
    )
    .then(success)
    .catch(fail);
}

function searchUsers(params, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get(
      `/search/users/${params.word}?page=${params.pageNum}&size=${params.size}&direction=ASC&colName=${params.colName}`,
      token ? config : null
    )
    .then(success)
    .catch(fail);
}

export { searchGames, searchUsers };
