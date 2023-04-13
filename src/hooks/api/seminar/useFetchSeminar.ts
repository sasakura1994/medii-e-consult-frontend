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
  const { isLoading, error, data} = useAuthenticatedSWR<{ image_url: string, seminar: SeminarEntityType, ticket_count: number; }>( endpoint + id );
  let seminar = data?.seminar;
  if ( seminar )
  {
    seminar.image_url = data?.image_url || "";
  }
  return {
    isLoading,
    error,
    seminar,
  };
};
