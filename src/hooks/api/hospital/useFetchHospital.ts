import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import type { HospitalEntityType } from '@/types/entities/hospitalEntity';

export type UseFetchHospitalType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  hospital: HospitalEntityType | undefined;
};

const endpoint = '/api/hospital/hospital_by_id';

export const useFetchHospital = (
  hospitalId: string | undefined
): UseFetchHospitalType => {
  const {
    isLoading,
    error,
    data: hospital,
  } = useAuthenticatedSWR<HospitalEntityType>(
    `${endpoint}?hospital_id=${hospitalId}`
  );

  return {
    isLoading,
    error,
    hospital,
  };
};
