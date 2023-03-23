import React from 'react';
import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { useRecoilState } from 'recoil';
import { prefectureState } from '@/globalStates/prefectureState';
import type { AxiosError } from 'axios';
import type { PrefectureEntityType } from '@/types/entities/prefectureEntity';

export type UseFetchPrefectureType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  prefecture: PrefectureEntityType[] | undefined;
};

const endpoint = '/api/prefecture/prefectures';

export const useFetchPrefecture = (): UseFetchPrefectureType => {
  const [prefecture, setPrefecture] = useRecoilState(prefectureState);

  const { isLoading, error, data } =
    useAuthenticatedSWR<PrefectureEntityType[]>(endpoint);

  React.useEffect(() => {
    let res: PrefectureEntityType[] = [];
    if (data) res = data;
    setPrefecture(() => res);
  }, [data]);

  return {
    isLoading,
    error,
    prefecture,
  };
};
