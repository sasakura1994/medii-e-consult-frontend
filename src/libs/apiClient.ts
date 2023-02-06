import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';

export type ApiClientOption = {
  token?: string;
};

type Header = {
  'content-type': string;
  Authorization?: string;
};

type ApiClient = AxiosInstance;
export type ApiClientResponse<T> = AxiosResponse<T>;
export type ApiClientError<T> = AxiosError<T>;

export const createApiClient = (options: ApiClientOption = {}): ApiClient => {
  const headers: Header = {
    'content-type': 'application/json; charset=utf-8',
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  const endpoint = process.env.WEB_SERVER_URL;

  const instance = axios.create({
    baseURL: endpoint,
    headers,
    responseType: 'json',
  });

  return instance;
};
