import axios from 'axios';

function restApi() {
  const ret = axios.create({
    baseURL: "https://dev.gambti.com/v1",
    headers: {
      'Content-type': 'application/json',
    },
  });
  return ret;
}


function GetConfig(token) {

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
      // 'Authorization': 'Bearer ' + accessToken

    },
  };
  return config;
}

export { restApi, GetConfig };




