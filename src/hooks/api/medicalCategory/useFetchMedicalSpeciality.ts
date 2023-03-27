import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import type { MedicalSpecialityEntityType } from '@/types/entities/medicalSpecialityEntity';

export type UseFetchMedicalSpecialityType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  medicalSpeciality: MedicalSpecialityEntityType[] | undefined;
};

const endpoint = '/api/medical_category/medical_specialities';

export const useFetchMedicalSpeciality = (): UseFetchMedicalSpecialityType => {
  const {
    isLoading,
    error,
    data: medicalSpeciality,
  } = useAuthenticatedSWR<MedicalSpecialityEntityType[]>(endpoint);

  return {
    isLoading,
    error,
    medicalSpeciality,
  };
};
