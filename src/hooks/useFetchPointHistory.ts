import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { fromNullToUndefined } from '@/libs/apiResponse';
import { pointHistoryMock } from '@/mocks/pointHistoryMock';
import type { PointHistoryEntityType } from '@/types/entities/pointHistoryEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/1';

type UseFetchPointHistoryType = {
  isLoading: boolean;
  error?: Error;
  pointHistories?: PointHistoryEntityType[];
};

export const useFetchPointHistory = (): UseFetchPointHistoryType => {
  const {
    isLoading,
    error,
    data: pointHistories,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      const res = await apiClient.get<PointHistoryEntityType[]>(url);
      const data = pointHistoryMock; // TODO: res.data に差し替え

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
    pointHistories,
  };
};
