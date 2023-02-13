import useSWR from 'swr';
import { createApiClient } from '@/libs/apiClient';
import { currentPointMock } from '@/mocks/pointHistoryMock';
import type { CurrentPointEntityType } from '@/types/entities/pointHistoryEntity';

const dummyToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ixxxxxxxxxxxxxxxxxxxxxxxx';
const dummyUrl = 'https://jsonplaceholder.typicode.com/users/2';

type UseFetchCurrentPointType = {
  isLoading: boolean;
  error?: Error;
  currentPoint?: number;
};

export const useFetchCurrentPoint = (): UseFetchCurrentPointType => {
  const {
    isLoading,
    error,
    data: currentPoint,
  } = useSWR(
    [dummyUrl, dummyToken],
    async ([url, token]) => {
      const apiClient = createApiClient({ token });
      const res = await apiClient.get<CurrentPointEntityType>(url);
      const data = currentPointMock; // TODO: res.data に差し替え
      return data.point;
    },
    { revalidateOnFocus: false }
  );

  return {
    isLoading,
    error,
    currentPoint,
  };
};
