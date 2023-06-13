import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import type { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

export type UseFetchMedicalSpecialityType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  medicalSpecialities: MedicalSpecialityEntity[] | undefined;
};

const endpoint = '/medical_category/medical_specialities';

export const useFetchMedicalSpecialities =
  (): UseFetchMedicalSpecialityType => {
    const {
      isLoading,
      error,
      data: medicalSpecialities,
    } = useAuthenticatedSWR<MedicalSpecialityEntity[]>(endpoint);

    return {
      isLoading,
      error,
      medicalSpecialities,
    };
  };
