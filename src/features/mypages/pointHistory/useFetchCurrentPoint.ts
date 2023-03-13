import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import type { KeyedMutator } from 'swr';
import type { CurrentPointEntityType } from './pointHistoryEntity';

const endpoint = '/api/medii_point/current_point';

export type UseFetchCurrentPointType = {
  isLoading: boolean;
  error?: Error;
  mutate: KeyedMutator<number | undefined>;
  currentPoint?: number;
};

export const useFetchCurrentPoint = (
  token: string
): UseFetchCurrentPointType => {
  const {
    isLoading,
    error,
    mutate,
    data: currentPoint,
  } = useSWR(
    [endpoint, token],
    async ([url, token]) => {
      if (!token) return;

      const apiClient = createApiClient({ token });
      const { data } = await apiClient.get<CurrentPointEntityType>(url);
      return data.point;
    },
    { revalidateOnFocus: false }
  );

  return {
    isLoading,
    error,
    mutate,
    currentPoint,
  };
};
