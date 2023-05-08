import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { HospitalEntity } from '@/types/entities/hospitalEntity';

export type UseFetchHospitalType = {
  hospital: HospitalEntity | undefined;
};

const endpoint = '/hospital/hospital_by_id';

export const useFetchHospital = (
  hospitalId: string | undefined
): UseFetchHospitalType => {
  const { data: hospital } = useAuthenticatedSWR<HospitalEntity>(
    hospitalId ? `${endpoint}?hospital_id=${hospitalId}` : null
  );

  return {
    hospital,
  };
};
