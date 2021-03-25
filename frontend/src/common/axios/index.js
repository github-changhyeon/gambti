import axios from "axios";

function restApi() {
  return axios.create({
    baseURL: "https://dev.gambti.com/v1",
    headers: {
      "Content-type": "application/json",
    },
  });
}

function getConfig() {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "X-Authorization-Firebase": token,
    },
  };
  return config;
}

export { restApi, getConfig };
