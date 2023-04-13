import React from 'react';
import { MedicalSpecialitySelectButtonProps } from './MedicalSpecialitySelectButton';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

export const useMedicalSpecialitySelectButton = ({
  specialityCode,
}: MedicalSpecialitySelectButtonProps) => {
  const [selectedSpecialityCode, setSelectedSpecialityCode] =
    React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const medicalSpecialityName = React.useMemo(
    () =>
      medicalSpecialities?.find(
        (medicalSpeciality) =>
          medicalSpeciality.speciality_code === specialityCode
      )?.name,
    [specialityCode, medicalSpecialities]
  );

  return {
    isOpen,
    medicalSpecialityName,
    selectedSpecialityCode,
    setIsOpen,
    setSelectedSpecialityCode,
  };
};
