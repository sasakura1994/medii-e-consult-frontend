import type { AxiosInstance } from 'axios';
import type { ApiErrorType } from '@/libs/apiClient';

type UseHandleApiErrorType = {
  handleApiError: (apiClient: AxiosInstance) => void;
};

export const useHandleApiError = (): UseHandleApiErrorType => {
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

        return Promise.reject<ApiErrorType>({
          ...errorObj,
          message: 'ネットワークエラー',
        });
      }
    );
  };

  return {
    handleApiError,
  };
};
