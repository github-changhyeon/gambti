import axios from 'axios';

function restApi() {
  axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-type': 'application/json',
    },
  });
}

function getConfig() {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'X-Authorization-Firebase': token,
    },
  };
  return config;
}

export { restApi, getConfig };
