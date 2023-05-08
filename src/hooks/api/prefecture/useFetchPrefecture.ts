import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';

export type UseFetchPrefectureType = {
  prefecture: PrefectureEntityType[] | undefined;
};

const endpoint = '/prefecture/prefectures';

export const useFetchPrefecture = (): UseFetchPrefectureType => {
  const { data: prefecture } =
    useAuthenticatedSWR<PrefectureEntityType[]>(endpoint);

  return {
    prefecture,
  };
};
