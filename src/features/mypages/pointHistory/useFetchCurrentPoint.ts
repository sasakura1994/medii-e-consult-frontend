import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { currentPointMock } from './pointMock';
import type { KeyedMutator } from 'swr';
import type { CurrentPointEntityType } from './pointHistoryEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/2';

export type UseFetchCurrentPointType = {
  isLoading: boolean;
  error?: Error;
  mutate: KeyedMutator<number>;
  currentPoint?: number;
};

export const useFetchCurrentPoint = (): UseFetchCurrentPointType => {
  const {
    isLoading,
    error,
    mutate,
    data: currentPoint,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      await apiClient.get<CurrentPointEntityType>(url); // TODO: res を受け取る
      const data = currentPointMock; // TODO: res.data に差し替え
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
