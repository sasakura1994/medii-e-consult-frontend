import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import { DoctorEntity } from '@/types/entities/doctorEntity';

export type SearchDoctorConditions = {
  experienceYears: string;
  speciality: string;
};

export type UseFetchProfileType = {
  isLoading: boolean;
  error?: Error;
  doctors?: DoctorEntity[];
};

export const useSearchDoctor = (
  conditions?: SearchDoctorConditions
): UseFetchProfileType => {
  const endpoint = conditions
    ? `/api/doctor/search_doctor?speciality=${conditions.speciality}&experiance_years=${conditions.experienceYears}`
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
