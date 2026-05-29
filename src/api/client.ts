import axios from 'axios';

const client = axios.create({
  baseURL: 'https://backend-fieri.vercel.app'
});

client.interceptors.request.use(config => {
  const token = localStorage.getItem('fieri_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
