import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { DoctorEntity } from '@/types/entities/doctorEntity';

export type UseFetchDoctorProfile = {
  doctor?: DoctorEntity;
};

export const useFetchDoctorProfile = (accountId?: string): UseFetchDoctorProfile => {
  const { data: doctor } = useAuthenticatedSWR<DoctorEntity>(
    accountId ? `/doctor/doctor_info?account_id=${accountId}` : null
  );

  return {
    doctor,
  };
};
