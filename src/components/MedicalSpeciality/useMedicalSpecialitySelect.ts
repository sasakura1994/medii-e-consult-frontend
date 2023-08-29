import React from 'react';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

// 科目選択ダイアログの共通処理
export const useMedicalSpecialitySelect = (medicalSpecialities?: MedicalSpecialityEntity[]) => {
  const [openingMedicalSpecialityCategoryIds, setOpeningMedicalSpecialityCategoryIds] = React.useState<string[]>([]);

  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();

  const getMedicalSpecialitiesForCategory = React.useCallback(
    (medicalSpecialityCategoryId: string) =>
      medicalSpecialities?.filter(
        (medicalSpeciality) => medicalSpeciality.medical_speciality_category_id === medicalSpecialityCategoryId
      ) || [],
    [medicalSpecialities]
  );

  const toggleCategory = React.useCallback((medicalSpecialityCategoryId: string) => {
    setOpeningMedicalSpecialityCategoryIds((openingMedicalSpecialityCategoryIds) => {
      if (openingMedicalSpecialityCategoryIds.includes(medicalSpecialityCategoryId)) {
        return openingMedicalSpecialityCategoryIds.filter((id) => id !== medicalSpecialityCategoryId);
      } else {
        return [...openingMedicalSpecialityCategoryIds, medicalSpecialityCategoryId];
      }
    });
  }, []);

  const isCategoryOpened = React.useCallback(
    (medicalSpecialityCategoryId: string) => openingMedicalSpecialityCategoryIds.includes(medicalSpecialityCategoryId),
    [openingMedicalSpecialityCategoryIds]
  );

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    medicalSpecialityCategories,
    medicalSpecialities,
    toggleCategory,
  };
};
