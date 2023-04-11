import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { DoctorEntity } from '@/types/entities/doctorEntity';

export type SearchDoctorConditions = {
  experienceYears: string;
  speciality: string;
};

export type UseSearchDoctorType = {
  isLoading: boolean;
  error?: Error;
  doctors?: DoctorEntity[];
};

export const useSearchDoctor = (
  conditions?: SearchDoctorConditions
): UseSearchDoctorType => {
  const endpoint = conditions
    ? `/api/doctor/search_doctor?speciality=${conditions.speciality}&experience_years=${conditions.experienceYears}`
    : undefined;

  const {
    isLoading,
    error,
    data: doctors,
  } = useAuthenticatedSWR<DoctorEntity[]>(endpoint);

  return {
    isLoading,
    error,
    doctors,
  };
};
