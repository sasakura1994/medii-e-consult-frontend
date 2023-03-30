import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import { SeminarEntityType } from '@/types/entities/seminarEntity';

export type UseFetchSeminarsType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  seminars: SeminarEntityType[] | undefined;
};

const endpoint = '/api/seminar';

export const useFetchSeminars = (): UseFetchSeminarsType => {
  const {
    isLoading,
    error,
    data: seminars,
  } = useAuthenticatedSWR<SeminarEntityType[]>(endpoint);

  return {
    isLoading,
    error,
    seminars,
  };
};
