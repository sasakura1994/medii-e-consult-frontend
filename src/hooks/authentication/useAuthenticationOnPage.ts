import React from 'react';
import { useToken } from './useToken';
import { redirectToLoginPage } from '@/libs/apiClient';

/**
 * 認証が必要なページに配置する
 */
export const useAuthenticationOnPage = () => {
  const { token, isTokenInitialized } = useToken();

  React.useEffect(() => {
    if (isTokenInitialized && token === '') {
      redirectToLoginPage();
    }
  }, [token, isTokenInitialized]);
};
