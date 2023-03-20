import { createApiClient } from '@/libs/apiClient';
import { useToken } from './useToken';

export const useAxios = (contentType?: string) => {
  const token = useToken();
  const axios = createApiClient({ token, contentType });

  return {
    axios,
    hasToken: !!token,
  };
};
