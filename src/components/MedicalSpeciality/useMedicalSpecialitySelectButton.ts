import { useMemo, useState } from 'react';
import { MedicalSpecialitySelectButtonProps } from './MedicalSpecialitySelectButton';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';

export const useMedicalSpecialitySelectButton = ({
  specialityCode,
  isGroup,
}: Pick<MedicalSpecialitySelectButtonProps, 'specialityCode' | 'isGroup'>) => {
  const [selectedSpecialityCode, setSelectedSpecialityCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { medicalSpecialities: medicalSpecialityList } = useFetchMedicalSpecialities();

  const medicalSpecialities = useMemo(() => {
    if (isGroup && medicalSpecialityList) {
      return [
        {
          medical_speciality_category_id: 'MDD',
          name: '複数専門領域合同(MDD)',
          speciality_code: 'MDD',
          display_order: 0,
        },
        ...medicalSpecialityList,
      ];
    }

    return medicalSpecialityList;
  }, [isGroup, medicalSpecialityList]);

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
