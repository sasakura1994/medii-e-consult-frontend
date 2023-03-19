import { fromNullToUndefined } from '@/libs/apiResponse';
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

    let response = undefined;
    if (Array.isArray(data)) {
      response = data.map((d) => fromNullToUndefined(d));
    } else {
      response = fromNullToUndefined(data);
    }

    return response;
  };

  return {
    fetcher,
  };
};
