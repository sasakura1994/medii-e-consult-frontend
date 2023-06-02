import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

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

export const createApiClient = (
  options: ApiClientOption = {}
): AxiosInstance => {
  const headers: Header = {
    'content-type': 'application/json',
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  if (options.contentType) {
    headers['content-type'] = options.contentType;
  }

  const endpoint = process.env.ENDPOINT_URL;

  const instance = axios.create({
    baseURL: endpoint,
    headers,
    responseType: 'json',
  });

  handleApiError(instance);

  return instance;
};

export const redirectToLoginPage = () => {
  const loginPageUrl = 'login';
  // 外部ドメイン経由の場合は常にExternalディレクトリに展開されるので、リダイレクト時には除去
  const redirectParam =
    '?redirect=' +
    encodeURIComponent(
      window.location.pathname.replace(
        process.env.WEB_EXTERNAL_SUB_DIR as string,
        ''
      ) + window.location.search
    );
  window.location.href = loginPageUrl + redirectParam;
};

const handleApiError = (apiClient: AxiosInstance) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorObj = {
        message: '',
        status: error.response?.status,
        url: error.response?.request.responseURL,
      };

      switch (error.response?.status) {
        case 401:
          redirectToLoginPage();
          return Promise.reject<ApiErrorType>({
            ...errorObj,
            message: '認証に失敗しました',
          });
        case 403:
          return Promise.reject<ApiErrorType>({
            ...errorObj,
            message: 'アクセス権限がありません',
          });
        case 404:
          return Promise.reject<ApiErrorType>({
            ...errorObj,
            message: 'ページが見つかりません',
          });
        case 422:
          return Promise.reject<ApiErrorType>({
            ...errorObj,
            message: '不具合によりアクセスできません',
          });
        case 500:
          return Promise.reject<ApiErrorType>({
            ...errorObj,
            message: 'サーバーでエラーが発生しました',
          });
        case 503:
          return Promise.reject<ApiErrorType>({
            ...errorObj,
            message: 'アクセス集中により只今ご利用できません',
          });
      }

      if (error.isAxiosError && error.response?.data?.errors) {
        const errorMessage = error.response.data.errors.messages.join('\n');
        return Promise.reject<ApiErrorType>({
          ...errorObj,
          message: errorMessage,
        });
      }

      if (error.isAxiosError && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        return Promise.reject<ApiErrorType>({
          ...errorObj,
          message: errorMessage,
        });
      }

      return Promise.reject<ApiErrorType>({
        ...errorObj,
        message: 'ネットワークエラー',
      });
    }
  );
};
