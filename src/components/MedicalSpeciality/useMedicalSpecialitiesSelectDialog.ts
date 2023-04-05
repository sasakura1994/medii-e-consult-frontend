import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import React from 'react';

export const useMedicalSpecialitiesSelectDialog = () => {
  const [
    openingMedicalSpecialityCategoryIds,
    setOpeningMedicalSpecialityCategoryIds,
  ] = React.useState<string[]>([]);
  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();

  const toggleCategory = React.useCallback(
    (medicalSpecialityCategoryId: string) => {
      setOpeningMedicalSpecialityCategoryIds(
        (openingMedicalSpecialityCategoryIds) => {
          if (
            openingMedicalSpecialityCategoryIds.includes(
              medicalSpecialityCategoryId
            )
          ) {
            return openingMedicalSpecialityCategoryIds.filter(
              (id) => id !== medicalSpecialityCategoryId
            );
          } else {
            return [
              ...openingMedicalSpecialityCategoryIds,
              medicalSpecialityCategoryId,
            ];
          }
        }
      );
    },
    []
  );

  const isCategoryOpened = React.useCallback(
    (medicalSpecialityCategoryId: string) =>
      openingMedicalSpecialityCategoryIds.includes(medicalSpecialityCategoryId),
    [openingMedicalSpecialityCategoryIds]
  );

  return { isCategoryOpened, medicalSpecialityCategories, toggleCategory };
};
