import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import { SeminarEntityType } from '@/types/entities/seminarEntity';

export type UseFetchRandomSeminarsType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  seminars: SeminarEntityType[] | undefined;
};

const endpoint = '/seminar/random_list?except_seminar_id=';

export const useFetchRandomSeminars = (
  id: string
): UseFetchRandomSeminarsType => {
  const { isLoading, error, data } = useAuthenticatedSWR<{
    seminars: SeminarEntityType[];
  }>(endpoint + id);
  const seminars = data?.seminars;
  return {
    isLoading,
    error,
    seminars,
  };
};
