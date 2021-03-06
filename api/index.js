import axios from 'axios';
import { API_URL, NEXT_URL } from 'utils/constants';

const configuration = {
  url: '/',
  method: 'GET',
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  timeout: 45000,
  responseType: 'json',
  validateStatus: (status) => status >= 200 && status < 300,
  maxRedirects: 5,
};

const axiosInstance = axios.create(configuration);

export default axiosInstance;

const authConfiguration = {
  url: '/',
  method: 'GET',
  baseURL: NEXT_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  timeout: 45000,
  responseType: 'json',
  validateStatus: (status) => status >= 200 && status < 300,
  maxRedirects: 5,
};

export const authAxiosInstance = axios.create(authConfiguration);
