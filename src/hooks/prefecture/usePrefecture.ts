import { useCallback } from 'react';
import { useFetchPrefecture } from '../api/prefecture/useFetchPrefecture';

export const usePrefecture = () => {
  const { prefecture } = useFetchPrefecture();

  const getPrefectureNameByCode = useCallback(
    (code: string | undefined): string | undefined => {
      if (!code || !prefecture) return undefined;

      const matched = prefecture.find((pref) => pref.code === code);
      return matched?.name;
    },
    [prefecture]
  );

  return { getPrefectureNameByCode, prefectures: prefecture };
};
