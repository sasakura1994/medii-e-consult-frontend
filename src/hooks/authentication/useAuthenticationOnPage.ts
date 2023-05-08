import React from 'react';
import { useToken } from './useToken';
import { redirectToLoginPage } from '@/libs/apiClient';
import { useRefreshToken } from '../api/doctor/useRefreshToken';

/**
 * 認証が必要なページに配置する
 */
export const useAuthenticationOnPage = () => {
  const {
    token,
    isTokenInitialized,
    isTokenRefreshed,
    setIsTokenRefreshed,
    setTokenAndMarkInitialized,
  } = useToken();
  const { refreshToken: getRefreshToken } = useRefreshToken();

  const tokenIsEmpty = token === '';

  const refreshToken = React.useCallback(async () => {
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

  React.useEffect(() => {
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
    // トークン関連の状態が変わったときだけ再実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIsEmpty, isTokenInitialized, isTokenRefreshed]);
};
