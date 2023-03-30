import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';

export type UseFetchPrefectureType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  prefecture: PrefectureEntityType[] | undefined;
};

const endpoint = '/api/prefecture/prefectures';

export const useFetchPrefecture = (): UseFetchPrefectureType => {
  const {
    isLoading,
    error,
    data: prefecture,
  } = useAuthenticatedSWR<PrefectureEntityType[]>(endpoint);

  return {
    isLoading,
    error,
    prefecture,
  };
};
