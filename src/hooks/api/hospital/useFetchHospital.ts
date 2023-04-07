import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import type { HospitalEntity } from '@/types/entities/hospitalEntity';

export type UseFetchHospitalType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  hospital: HospitalEntity | undefined;
};

const endpoint = '/api/hospital/hospital_by_id';

export const useFetchHospital = (
  hospitalId: string | undefined
): UseFetchHospitalType => {
  const {
    isLoading,
    error,
    data: hospital,
  } = useAuthenticatedSWR<HospitalEntity>(
    hospitalId ? `${endpoint}?hospital_id=${hospitalId}` : null
  );

  return {
    isLoading,
    error,
    hospital,
  };
};
