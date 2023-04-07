import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';
import { MedicalSpecialitySelectDialogProps } from './MedicalSpecialitySelectDialog';
import { useMedicalSpecialitySelect } from './useMedicalSpecialitySelect';

export const useMedicalSpecialitySelectDialog = (
  props: MedicalSpecialitySelectDialogProps
) => {
  const { defaultSpecialityCode, onChange } = props;
  const {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    medicalSpecialityCategories,
    medicalSpecialities,
    toggleCategory,
  } = useMedicalSpecialitySelect();

  const [selectedSpecialityCode, setSelectedSpecialityCode] =
    React.useState<string>(defaultSpecialityCode);

  const submit = React.useCallback(() => {
    onChange(selectedSpecialityCode);
  }, [selectedSpecialityCode]);

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    medicalSpecialityCategories,
    medicalSpecialities,
    selectedSpecialityCode,
    setSelectedSpecialityCode,
    submit,
    toggleCategory,
  };
};
