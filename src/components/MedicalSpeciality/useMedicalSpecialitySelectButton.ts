import React, { useMemo } from 'react';
import { MedicalSpecialitySelectButtonProps } from './MedicalSpecialitySelectButton';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

export const useMedicalSpecialitySelectButton = ({ specialityCode, isGroup }: MedicalSpecialitySelectButtonProps) => {
  const [selectedSpecialityCode, setSelectedSpecialityCode] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const { medicalSpecialities: medicalSpecialityList } = useFetchMedicalSpecialities();

  const medicalSpecialities = useMemo(() => {
    if (isGroup) {
      medicalSpecialityList?.unshift({
        medical_speciality_category_id: 'MDD',
        name: '複数専門領域合同(MDD)',
        speciality_code: 'MDD',
        display_order: 0,
      });
    }

    return medicalSpecialityList;
  }, [isGroup, medicalSpecialityList]);

  const medicalSpecialityName = React.useMemo(
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
