import { useCallback, useEffect } from 'react';
import { useToken } from './useToken';
import { redirectToLoginPage } from '@/libs/apiClient';
import { useRefreshToken } from '../api/doctor/useRefreshToken';
import { useGuest } from './useGuest';

// 認証が不要なページはここに追加する
const unauthenticatedPages = [
  '/initpassword',
  '/login',
  '/passwordreset',
  '/passwordresetrequest',
  '/registration',
  '/auth/callback',
  '/privacypolicy',
  '/guest',
  '/howtouse',
  '/withdrawal/completed',
];

/**
 * 認証が必要なページに配置する
 */
export const useAuthenticationOnPage = (currentPath: string) => {
  const { token, isTokenInitialized, isTokenRefreshed, setIsTokenRefreshed, setTokenAndMarkInitialized } = useToken();
  const { refreshToken: getRefreshToken } = useRefreshToken();
  useGuest();

  const tokenIsEmpty = token === '';

  const refreshToken = useCallback(async () => {
    const response = await getRefreshToken().catch((error) => {
      console.error(error);
      return null;
    });

    if (!response) {
      redirectToLoginPage();
      return;
    }

    setTokenAndMarkInitialized(response.data.jwt_token);
    setIsTokenRefreshed(true);
  }, [getRefreshToken, setIsTokenRefreshed, setTokenAndMarkInitialized]);

  useEffect(() => {
    // 現在のページが認証が不要なページのリストに含まれている場合は処理をスキップ
    if (unauthenticatedPages.includes(currentPath)) {
      return;
    }
    if (!isTokenInitialized) {
      return;
    }

    if (tokenIsEmpty) {
      redirectToLoginPage();
      return;
    }

    if (isTokenRefreshed) {
      return;
    }

    refreshToken();
  }, [tokenIsEmpty, isTokenInitialized, isTokenRefreshed, currentPath, refreshToken]);
};
