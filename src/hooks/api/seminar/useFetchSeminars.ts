import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import { SeminarEntityType } from '@/types/entities/seminarEntity';

export type UseFetchSeminarsType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  seminars: SeminarEntityType[] | undefined;
  maxPage: number | undefined;
  allItemsCount: number | undefined;
};

const endpoint = '/seminar?page=';

export const useFetchSeminars = (currentPage?: number): UseFetchSeminarsType => {
  const { isLoading, error, data } = useAuthenticatedSWR<{
    seminars: SeminarEntityType[];
    max_page: number;
    all_items_count: number;
  }>(endpoint + (currentPage ?? 1));
  const seminars = data?.seminars;
  const maxPage = data?.max_page;
  const allItemsCount = data?.all_items_count;
  return {
    isLoading,
    error,
    seminars,
    maxPage,
    allItemsCount,
  };
};
