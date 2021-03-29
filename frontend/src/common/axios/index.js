import axios from "axios";

function restApi() {
  return axios.create({
    baseURL: "https://dev.gambti.com/v1",
    headers: {
      "Content-type": "application/json",
    },
  });
}

function getConfig(token) {
  // const token = localStorage.getItem("idToken");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      // 'Authorization': 'Bearer ' + accessToken
    },
  };
  return config;
}

export { restApi, getConfig };
