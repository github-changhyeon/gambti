import { restApi, getConfig } from "./index";

// 대략 이런식으로 -> 수정 필요하면 수정해서 사용

// 친구추가
function addFriend(toUserId, fromUserToken, success, fail) {
  // param : 계정 정보가 담긴 object
  const config = getConfig(fromUserToken);
  const instance = restApi();
  instance.post(`/friends/${toUserId}`, {}, config).then(success).catch(fail);
}

function getRecommendedFriends(userToken, success, fail) {
  const config = getConfig(userToken);
  const instance = restApi();
  instance.get(`/friends/recommends`, config).then(success).catch(fail);
}

// 등등

export { addFriend, getRecommendedFriends };
