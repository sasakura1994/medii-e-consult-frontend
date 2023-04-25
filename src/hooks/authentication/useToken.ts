import React from 'react';
import { getAuthToken } from '@/libs/cookie';

export const useToken = (): string => {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storageToken = getAuthToken();
    setToken(storageToken || '');
  }, [token, typeof window]);

  return token;
};
