import type { ApiClientError } from '@/libs/apiClient';

export const getErrorMessage = (error: ApiClientError<unknown>): string => {
  switch (error.response?.status) {
    case 400:
      return 'リクエストが不正です';
    case 401:
      return '権限がありません';
    case 404:
      return 'ページが見つかりません';
    case 500:
      return 'サーバーで問題が発生しました';
    default:
      return 'エラーが発生しました。時間を置いて再度お試しください';
  }
};
