import { restApi, getConfig } from './index';

function getGameOrderByRecomm(param, success, fail) {
  const config = getConfig;
  restApi
    .get(`/games/recommends?size=${param.size}&page=${param.pageNum}`, config)
    .then(success)
    .catch(fail);
}

export { getGameOrderByRecomm };
