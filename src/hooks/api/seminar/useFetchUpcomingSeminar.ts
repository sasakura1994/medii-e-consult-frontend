import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { SeminarEntityType } from '@/types/entities/seminarEntity';

export type UseFetchSeminars = {
  seminars: SeminarEntityType[] | undefined;
};

const endpoint = '/seminar/upcoming';

export const useFetchUpcomingSeminar = (count?: number): UseFetchSeminars => {
  const { data } = useAuthenticatedSWR<{
    seminors: SeminarEntityType[];
  }>(endpoint + (count ? `?count=${count}` : ''));
  const seminars = data?.seminors;
  return {
    seminars,
  };
};
