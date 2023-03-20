import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import { useToken } from './useToken';
import type { AxiosInstance } from 'axios';

export const useAxios = (contentType?: string) => {
  // const [axios, setAxios] = React.useState<AxiosInstance>({} as AxiosInstance);
  // const [hasToken, setHasToken] = React.useState(false);
  const token = useToken();
  const axios = createApiClient({ token, contentType });

  // const getAxios = () => {
  //   const apiClient = createApiClient({ token });
  //   setAxios(apiClient);
  // };

  // setHasToken(!!token);

  // React.useEffect(() => {
  //   if (typeof window === 'undefined') {
  //     return;
  //   }

  //   console.log('*** token ***', token);
  //   getAxios();
  // }, [token, typeof window]);

  return {
    // axios,
    // hasToken,
    axios,
    hasToken: !!token,
  };
};
