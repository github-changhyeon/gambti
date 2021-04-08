import axios from "axios";
import fire from "src/fire";

function restApi() {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "Content-type": "application/json",
    },
  });
}

async function checkTokenExpiration() {
  // 현재 로그인한 유저가 있는지 가져온다
  var currentUser = fire.auth.currentUser;

  // 로그인한 유저가 있다면
  if (currentUser) {
    // 로그인한 유저의 토큰정보를 가져와서
    await currentUser
      .getIdTokenResult()
      .then((res) => {
        // 토큰 만료시간이 10분 전이라면 토큰을 재발급해준다.
        if (
          new Date(res.expirationTime).getTime() - new Date().getTime() <
          600000
        ) {
          currentUser
            .getIdToken(true)
            .then((res) => {
              localStorage.setItem("idToken", res);
            })
            .catch((err) => {
              alert(err);
            });
        }
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    // 로컬스토리지에 토큰을 비운다.
    localStorage.clear();
    window.location.reload();
  }
}

function getConfig(token) {
  // 현재 로컬 스토리지에 토큰을 가지고 있는 유저면 토큰의 유효성 검사를 위해 확인한다
  if (localStorage.getItem("idToken")) {
    checkTokenExpiration();
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Authorization': 'Bearer ' + accessToken
    },
  };
  return config;
}
export default function AxiosIndex() {}

export { restApi, getConfig };
