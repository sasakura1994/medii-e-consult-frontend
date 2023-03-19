import { createApiClient } from '@/libs/apiClient';
import { useToken } from './useToken';

export type UseFetcherType = {
  fetcher: (url: string) => unknown;
};

export const useFetcher = (): UseFetcherType => {
  const token = useToken('token');
  const apiClient = createApiClient({ token });

  const fetcher = async (url: string) => {
    const { data } = await apiClient.get(url);
    return data;
  };

  return {
    fetcher,
  };
};
