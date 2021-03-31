import { restApi, getConfig } from "./index";

function searchGames(word, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get(`/search/games/${word}`, token ? config : null)
    .then(success)
    .catch(fail);
}

function searchUsers(word, success, fail) {
  const token = localStorage.getItem("idToken");
  const config = getConfig(token);
  restApi()
    .get(`/search/users/${word}`, token ? config : null)
    .then(success)
    .catch(fail);
}

export { searchGames, searchUsers };
