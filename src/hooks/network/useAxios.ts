import React, { useRef } from 'react';
import { createApiClient } from '@/libs/apiClient';
import { useToken } from '@/hooks/authentication/useToken';
import axios from 'axios';
type LoadingRequest = {
  [key: string]: boolean;
};
export const useAxios = (contentType?: string) => {
  const { token } = useToken();
  const ongoingRequests = useRef<LoadingRequest>({});
  const apiClient = React.useMemo(() => {
    const client = createApiClient({ token, contentType });

    client.interceptors.request.use(async (config) => {
      if (config.method === 'get') {
        return config;
      }

      const key = `${config.method}-${config.url}`;

      if (ongoingRequests.current[key] === true) {
        throw new axios.Cancel('duplicate request');
      }

      ongoingRequests.current[key] = true;
      return config;
    });

    client.interceptors.response.use(
      (response) => {
        if (response.config.method === 'get') {
          return response;
        }

        const key = `${response.config.method}-${response.config.url}`;
        ongoingRequests.current[key] = false;
        return response;
      },
      (error) => {
        if (!axios.isCancel(error)) {
          const key = `${error.config.method}-${error.config.url}`;
          ongoingRequests.current[key] = false;
        }
        return Promise.reject(error);
      }
    );

    return client;
  }, [token, contentType]);

  return {
    axios: apiClient,
    hasToken: !!token,
  };
};
