import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';
import { MedicalSpecialitiesSelectDialogProps } from './MedicalSpecialitiesSelectDialog';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';

export const useMedicalSpecialitiesSelectDialog = (
  props: MedicalSpecialitiesSelectDialogProps
) => {
  const { defaultSelectedMedicalSpecialities, onChange } = props;
  const [
    openingMedicalSpecialityCategoryIds,
    setOpeningMedicalSpecialityCategoryIds,
  ] = React.useState<string[]>([]);
  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] =
    React.useState<MedicalSpecialityEntity[]>(
      defaultSelectedMedicalSpecialities
    );

  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();
  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();

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

  const moveSelectedMedicalSpeciality = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSelectedMedicalSpecialities((selectedMedicalSpecialities) => {
        const copy = [...selectedMedicalSpecialities];
        const dragging = copy.splice(dragIndex, 1);
        return [
          ...copy.slice(0, hoverIndex),
          dragging[0],
          ...copy.slice(hoverIndex),
        ];
      });
    },
    []
  );

  const submit = React.useCallback(() => {
    onChange(selectedMedicalSpecialities);
  }, [selectedMedicalSpecialities]);

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    moveSelectedMedicalSpeciality,
    medicalSpecialityCategories,
    medicalSpecialities,
    selectedMedicalSpecialities,
    setSelectedMedicalSpecialities,
    submit,
    toggleCategory,
    toggleMedicalSpeciality,
  };
};