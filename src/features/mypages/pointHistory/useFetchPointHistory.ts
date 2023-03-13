import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import type { KeyedMutator } from 'swr';
import type { PointHistoryEntityType } from './pointHistoryEntity';

const endpoint = '/api/medii_point/point_history';

export type UseFetchPointHistoryType = {
  isLoading: boolean;
  error?: Error;
  mutate: KeyedMutator<PointHistoryEntityType[] | undefined>;
  pointHistories?: PointHistoryEntityType[];
};

export const useFetchPointHistory = (
  token: string
): UseFetchPointHistoryType => {
  const {
    isLoading,
    error,
    mutate,
    data: pointHistories,
  } = useSWR(
    [endpoint, token],
    async ([url, token]) => {
      if (!token) return;

      const apiClient = createApiClient({ token });
      const { data } = await apiClient.get<PointHistoryEntityType[]>(url);
      const pointHistories = data.map((data) =>
        fromNullToUndefined<PointHistoryEntityType>(data)
      );

      return pointHistories;
    },
    { revalidateOnFocus: false }
  );

  return {
    isLoading,
    error,
    mutate,
    pointHistories,
  };
};
