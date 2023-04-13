import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import { SeminarEntityType } from '@/types/entities/seminarEntity';

export type UseFetchSeminarType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  seminar: SeminarEntityType | undefined;
};

const endpoint = '/seminar/';

export const useFetchSeminar = (id: string): UseFetchSeminarType => {
  const { isLoading, error, data: seminar } = useAuthenticatedSWR<SeminarEntityType>(endpoint + id);
  return {
    isLoading,
    error,
    seminar,
  };
};
