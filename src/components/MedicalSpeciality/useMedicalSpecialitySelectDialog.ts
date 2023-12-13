import React from 'react';
import { MedicalSpecialitySelectDialogProps } from './MedicalSpecialitySelectDialog';
import { useMedicalSpecialitySelect } from './useMedicalSpecialitySelect';

export const useMedicalSpecialitySelectDialog = (props: MedicalSpecialitySelectDialogProps) => {
  const { defaultSpecialityCode, medicalSpecialities, onChange } = props;
  const { getMedicalSpecialitiesForCategory, isCategoryOpened, medicalSpecialityCategories, toggleCategory } =
    useMedicalSpecialitySelect(medicalSpecialities);

  const [selectedSpecialityCode, setSelectedSpecialityCode] = React.useState<string>(defaultSpecialityCode);

  const submit = React.useCallback(() => {
    onChange(selectedSpecialityCode);
  }, [onChange, selectedSpecialityCode]);

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    medicalSpecialityCategories,
    selectedSpecialityCode,
    setSelectedSpecialityCode,
    submit,
    toggleCategory,
  };
};
