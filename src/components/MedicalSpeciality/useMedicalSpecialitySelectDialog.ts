import React from 'react';
import { MedicalSpecialitySelectDialogProps } from './MedicalSpecialitySelectDialog';
import { useMedicalSpecialitySelect } from './useMedicalSpecialitySelect';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';

export const useMedicalSpecialitySelectDialog = (props: MedicalSpecialitySelectDialogProps) => {
  const { defaultSpecialityCode, onChange } = props;
  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
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
    medicalSpecialities,
    selectedSpecialityCode,
    setSelectedSpecialityCode,
    submit,
    toggleCategory,
  };
};
