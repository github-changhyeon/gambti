import axios from "axios";
import fire from 'src/fire';

function restApi() {
  return axios.create({
    baseURL: "https://dev.gambti.com/v1",
    headers: {
      "Content-type": "application/json",
    },
  });
}

function checkTokenExpiration() {
  // 현재 로그인한 유저가 있는지 가져온다
  var currentUser = fire.auth.currentUser;
  
  // 로그인한 유저가 있다면
  if (currentUser) {
    // 로그인한 유저의 토큰정보를 가져와서
    currentUser.getIdTokenResult()
    .then(res => {
      // 토큰의 만료시간과 현재시간을 비교해서 만료시간이 지났다면 로그아웃 시킨다.
      if (new Date(res.expirationTime).getTime() - new Date().getTime() < 0) {
        fire.auth.signOut()
        .then(() => {
          window.localStorage.clear();
        })
        .catch(err => {
          // An error happened.
        });
      }
    })
    .catch(err => {
      alert(err)
    })
  }
}

function getConfig(token) {
  // 현재 토큰이 유요한 토큰인지 확인 한 후 만료된 토큰이면 로그아웃 하는 함수
  checkTokenExpiration()

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Authorization': 'Bearer ' + accessToken
    },
  };
  return config;
}

export { restApi, getConfig };
