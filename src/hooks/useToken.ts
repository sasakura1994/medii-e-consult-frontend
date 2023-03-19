import React from 'react';

export const useToken = (key: string): string => {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const storageToken = localStorage.getItem('token');
    setToken(storageToken || '');
  }, [token, typeof window]);

  return token;
};
