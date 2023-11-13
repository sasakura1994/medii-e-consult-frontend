import { useMemo, useState } from 'react';
import { MedicalSpecialitySelectButtonProps } from './MedicalSpecialitySelectButton';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

export const useMedicalSpecialitySelectButton = ({
  specialityCode,
}: Pick<MedicalSpecialitySelectButtonProps, 'specialityCode'>) => {
  const [selectedSpecialityCode, setSelectedSpecialityCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const medicalSpecialityName = useMemo(
    () => medicalSpecialities?.find((medicalSpeciality) => medicalSpeciality.speciality_code === specialityCode)?.name,
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
