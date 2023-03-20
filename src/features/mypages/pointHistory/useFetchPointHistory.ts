import { useAuthenticatedSWR } from '@/hooks/useAuthenticatedSWR';
import type { PointHistoryEntityType } from './pointHistoryEntity';

const endpoint = '/api/medii_point/point_history';

export type UseFetchPointHistoryType = {
  isLoading: boolean;
  error?: Error;
  pointHistories?: PointHistoryEntityType[];
};

export const useFetchPointHistory = (): UseFetchPointHistoryType => {
  const {
    isLoading,
    error,
    data: pointHistories,
  } = useAuthenticatedSWR<PointHistoryEntityType[]>(endpoint);

  return {
    isLoading,
    error,
    pointHistories,
  };
};
