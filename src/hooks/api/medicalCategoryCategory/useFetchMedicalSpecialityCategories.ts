import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';
import type { AxiosError } from 'axios';
import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';

type GetMedicalSpecialityCategoriesResponseData = {
  medical_speciality_categories: MedicalSpecialityCategoryEntity[];
};

export type UseFetchMedicalSpecialityCategoriesType = {
  isLoading: boolean;
  error: AxiosError | undefined;
  medicalSpecialityCategories?: MedicalSpecialityCategoryEntity[];
};

const endpoint = '/medical_category/medical_speciality_categories';

export const useFetchMedicalSpecialityCategories = (): UseFetchMedicalSpecialityCategoriesType => {
  const { isLoading, error, data } = useAuthenticatedSWR<GetMedicalSpecialityCategoriesResponseData>(endpoint);

  return {
    isLoading,
    error,
    medicalSpecialityCategories: data?.medical_speciality_categories,
  };
};
