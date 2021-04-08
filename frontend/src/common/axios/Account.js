import { restApi, getConfig } from "./index";

// 대략 이런식으로 -> 수정 필요하면 수정해서 사용

// 회원가입
function signup(user, param, success, fail) {
  // param : 계정 정보가 담긴 object
  const config = getConfig(user);
  const instance = restApi();
  instance.post(`/account/signup`, param, config).then(success).catch(fail);
}

// 회원정보 수정
function editProfile(param, success, fail) {
  const config = getConfig();
  restApi.patch(`/accounts`, param, config).then(success).catch(fail);
}

// 등등

export { signup, editProfile };
