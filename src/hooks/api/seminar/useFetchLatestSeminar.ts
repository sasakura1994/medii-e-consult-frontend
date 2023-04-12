import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { SeminarEntityType } from '@/types/entities/seminarEntity';
import type { AxiosError } from 'axios';

export type UseFetchLatestSeminarType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  latestSeminar: SeminarEntityType | undefined;
};

const endpoint = '/seminar/latest';

export const useFetchLatestSeminar = (): UseFetchLatestSeminarType => {
  const { isLoading, error, data } = useAuthenticatedSWR<{
    seminar: SeminarEntityType;
  }>(endpoint);
  const latestSeminar = data?.seminar;
  return {
    isLoading,
    error,
    latestSeminar,
  };
};
