import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';

export const useMedicalSpecialitiesSelectDialog = () => {
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();

  return { medicalSpecialityCategories };
};
