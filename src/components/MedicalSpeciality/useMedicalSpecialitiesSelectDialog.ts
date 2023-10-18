import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';
import { MedicalSpecialitiesSelectDialogProps } from './MedicalSpecialitiesSelectDialog';
import { useMedicalSpecialitySelect } from './useMedicalSpecialitySelect';
import { moveItem } from '@/libs/dnd';

export const useMedicalSpecialitiesSelectDialog = (
  props: MedicalSpecialitiesSelectDialogProps,
  medicalSpecialities?: MedicalSpecialityEntity[]
) => {
  const { defaultSelectedMedicalSpecialities, onChange } = props;
  const { getMedicalSpecialitiesForCategory, isCategoryOpened, medicalSpecialityCategories, toggleCategory } =
    useMedicalSpecialitySelect(medicalSpecialities);

  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] = React.useState<MedicalSpecialityEntity[]>(
    defaultSelectedMedicalSpecialities
  );

  const selectedSpecialityCodes = React.useMemo(
    () => selectedMedicalSpecialities.map((medicalSpeciality) => medicalSpeciality.speciality_code),
    [selectedMedicalSpecialities]
  );

  const toggleMedicalSpeciality = React.useCallback(
    (toggledMedicalSpeciality: MedicalSpecialityEntity) => {
      if (selectedSpecialityCodes.includes(toggledMedicalSpeciality.speciality_code)) {
        setSelectedMedicalSpecialities((selectedMedicalSpecialities) =>
          selectedMedicalSpecialities.filter(
            (medicalSpeciality) => medicalSpeciality.speciality_code !== toggledMedicalSpeciality.speciality_code
          )
        );
        return;
      }

      if (selectedMedicalSpecialities.length >= 4) {
        return;
      }

      setSelectedMedicalSpecialities((selectedMedicalSpecialities) => [
        ...selectedMedicalSpecialities,
        toggledMedicalSpeciality,
      ]);
    },
    [selectedMedicalSpecialities.length, selectedSpecialityCodes]
  );

  const isMedicalSpecialitySelected = React.useCallback(
    (specialityCode: string) => selectedSpecialityCodes.includes(specialityCode),
    [selectedSpecialityCodes]
  );

  const moveSelectedMedicalSpeciality = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSelectedMedicalSpecialities(moveItem(selectedMedicalSpecialities, dragIndex, hoverIndex));
    },
    [selectedMedicalSpecialities]
  );

  const getSelectedCountForCategory = React.useCallback(
    (medicalSpecialityCategoryId: string) =>
      selectedMedicalSpecialities.filter(
        (medicalSpeciality) => medicalSpeciality.medical_speciality_category_id === medicalSpecialityCategoryId
      ).length,
    [selectedMedicalSpecialities]
  );

  const submit = React.useCallback(() => {
    onChange(selectedMedicalSpecialities);
  }, [onChange, selectedMedicalSpecialities]);

  return {
    getMedicalSpecialitiesForCategory,
    getSelectedCountForCategory,
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
