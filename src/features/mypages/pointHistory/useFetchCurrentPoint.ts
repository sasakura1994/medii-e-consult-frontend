import { useAuthenticatedSWR } from '@/hooks/useAuthenticatedSWR';
import type { CurrentPointEntityType } from './pointHistoryEntity';

const endpoint = '/api/medii_point/current_point';

export type UseFetchCurrentPointType = {
  isLoading: boolean;
  error?: Error;
  currentPoint?: number;
};

export const useFetchCurrentPoint = (): UseFetchCurrentPointType => {
  const { isLoading, error, data } =
    useAuthenticatedSWR<CurrentPointEntityType>(endpoint);

  return {
    isLoading,
    error,
    currentPoint: data?.point,
  };
};
