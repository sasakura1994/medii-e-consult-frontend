import React from 'react';

export const useToken = (): string => {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    const storageToken = localStorage.getItem('token');
    setToken(storageToken || '');
  }, [token]);

  return token;
};
