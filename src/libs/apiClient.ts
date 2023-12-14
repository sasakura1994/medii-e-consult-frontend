import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import Router from 'next/router';

export type ApiClientOption = {
  token?: string | null;
  contentType?: string;
};

type Header = {
  'content-type': string;
  Authorization?: string;
};

export type ApiClientResponse<T> = AxiosResponse<T>;
export type ApiClientError<T> = AxiosError<T>;
export type ApiErrorType = {
  message: string;
  status?: number;
  url?: string;
};

export const createApiClient = (options: ApiClientOption = {}): AxiosInstance => {
  const headers: Header = {
    'content-type': 'application/json',
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  if (options.contentType) {
    headers['content-type'] = options.contentType;
  }

  let endpoint = process.env.ENDPOINT_URL;
  if (typeof window !== 'undefined') {
    if (!location.hostname.includes('medii.jp') && location.hostname !== 'localhost' && process.env.EX_API_DIR) {
      endpoint = location.origin + process.env.EX_API_DIR;
    }
  }

  const instance = axios.create({
    baseURL: endpoint,
    headers,
    responseType: 'json',
  });

  handleApiError(instance);

  return instance;
};

export const redirectToLoginPage = () => {
  const externalDir = process.env.EX_WEB_DIR as string;
  const loginPageUrl = externalDir + '/login';
  // 外部ドメイン経由の場合は常にExternalディレクトリに展開されるので、リダイレクト時には除去
  const redirectParam =
    '?redirect=' + encodeURIComponent(window.location.pathname.replace(externalDir, '') + window.location.search);
  const redirectUrl = loginPageUrl + redirectParam;
  Router.push(redirectUrl);
};

const handleApiError = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => {
      //C#のErrorリザルトの場合はエラーを返す
      if (response.data.code && response.data.code != 1) {
        //Header.vueの401監視がエラー吐くのでエラー時と型合わせてやる
        return Promise.reject({ response: response });
      }
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        redirectToLoginPage();
      }

      return Promise.reject(error);
    }
  );
};
