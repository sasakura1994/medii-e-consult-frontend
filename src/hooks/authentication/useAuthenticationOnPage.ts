import React from 'react';
import { useToken } from './useToken';
import { redirectToLoginPage } from '@/libs/apiClient';

export const useAuthenticationOnPage = () => {
  const { token, isTokenInitialized } = useToken();

  React.useEffect(() => {
    if (isTokenInitialized && token === '') {
      redirectToLoginPage();
    }
  }, [token, isTokenInitialized]);
};
