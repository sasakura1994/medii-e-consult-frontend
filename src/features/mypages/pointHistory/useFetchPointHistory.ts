import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { pointHistoriesMock } from './pointMock';
import type { KeyedMutator } from 'swr';
import type { PointHistoryEntityType } from './pointHistoryEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/3';

export type UseFetchPointHistoryType = {
  isLoading: boolean;
  error?: Error;
  mutate: KeyedMutator<PointHistoryEntityType[]>;
  pointHistories?: PointHistoryEntityType[];
};

export const useFetchPointHistory = (): UseFetchPointHistoryType => {
  const {
    isLoading,
    error,
    mutate,
    data: pointHistories,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      await apiClient.get<PointHistoryEntityType[]>(url); // TODO: res を受け取る
      const data = pointHistoriesMock; // TODO: res.data に差し替え

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
