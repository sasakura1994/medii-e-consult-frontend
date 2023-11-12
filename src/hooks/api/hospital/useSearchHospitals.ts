import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { HospitalEntity } from '@/types/entities/hospitalEntity';

export type UseFetchHospitalType = {
  hospitals: HospitalEntity[];
};

export const useSearchHospitals = (prefectureCode?: string, keyword?: string): UseFetchHospitalType => {
  const { data: hospitals } = useAuthenticatedSWR<HospitalEntity[]>(
    prefectureCode && keyword && keyword.length > 1
      ? `/hospital/search_hospitals?prefecture_code=${prefectureCode}&search=${encodeURIComponent(keyword)}`
      : null
  );

  return {
    hospitals: hospitals ?? [],
  };
};
