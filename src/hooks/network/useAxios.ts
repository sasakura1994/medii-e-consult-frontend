import React from 'react';
import { createApiClient } from '@/libs/apiClient';
import { useToken } from '@/hooks/authentication/useToken';

export const useAxios = (contentType?: string) => {
  const token = useToken();
  const axios = React.useMemo(() => {
    return createApiClient({ token, contentType });
  }, [token, contentType]);

  return {
    axios,
    hasToken: !!token,
  };
};
