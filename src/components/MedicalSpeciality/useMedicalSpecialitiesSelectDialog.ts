import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpeciality';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';
import { MedicalSpecialitiesSelectDialogProps } from './MedicalSpecialitiesSelectDialog';

export const useMedicalSpecialitiesSelectDialog = (
  props: MedicalSpecialitiesSelectDialogProps
) => {
  const [
    openingMedicalSpecialityCategoryIds,
    setOpeningMedicalSpecialityCategoryIds,
  ] = React.useState<string[]>([]);
  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] =
    React.useState<MedicalSpecialityEntity[]>(
      props.defaultSelectedMedicalSpecialities
    );

  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const selectedSpecialityCodes = React.useMemo(
    () =>
      selectedMedicalSpecialities.map(
        (medicalSpeciality) => medicalSpeciality.speciality_code
      ),
    [selectedMedicalSpecialities]
  );

  const getMedicalSpecialitiesForCategory = React.useCallback(
    (medicalSpecialityCategoryId: string) =>
      medicalSpecialities?.filter(
        (medicalSpeciality) =>
          medicalSpeciality.medical_speciality_category_id ===
          medicalSpecialityCategoryId
      ) || [],
    [medicalSpecialities]
  );

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

  const toggleMedicalSpeciality = React.useCallback(
    (toggledMedicalSpeciality: MedicalSpecialityEntity) => {
      if (
        selectedSpecialityCodes.includes(
          toggledMedicalSpeciality.speciality_code
        )
      ) {
        setSelectedMedicalSpecialities((selectedMedicalSpecialities) =>
          selectedMedicalSpecialities.filter(
            (medicalSpeciality) =>
              medicalSpeciality.speciality_code !==
              toggledMedicalSpeciality.speciality_code
          )
        );
      } else {
        if (selectedSpecialityCodes.length >= 4) {
          return;
        }

        setSelectedMedicalSpecialities((selectedMedicalSpecialities) => [
          ...selectedMedicalSpecialities,
          toggledMedicalSpeciality,
        ]);
      }
    },
    [selectedSpecialityCodes]
  );

  const isCategoryOpened = React.useCallback(
    (medicalSpecialityCategoryId: string) =>
      openingMedicalSpecialityCategoryIds.includes(medicalSpecialityCategoryId),
    [openingMedicalSpecialityCategoryIds]
  );

  const isMedicalSpecialitySelected = React.useCallback(
    (specialityCode: string) =>
      selectedSpecialityCodes.includes(specialityCode),
    [selectedSpecialityCodes]
  );

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
    toggleCategory,
    toggleMedicalSpeciality,
  };
};
