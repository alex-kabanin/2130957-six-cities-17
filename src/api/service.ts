import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {API_URL, API_TIMEOUT} from '../const.ts';
import { getToken } from './token';


export const createApi = (): AxiosInstance => axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});


export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_URL,
    timeout: API_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    }
  );
  return api;
};
