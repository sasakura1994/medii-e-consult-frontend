import { useCallback } from 'react';
import { useFetchMedicalSpecialities } from '../api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

type UseMedicalSpeciality = {
  medicalSpecialities?: MedicalSpecialityEntity[];
  getMedicalSpecialityName: (specialityCode: string) => string | undefined;
};

export const useMedicalSpeciality = (): UseMedicalSpeciality => {
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const getMedicalSpecialityName = useCallback(
    (specialityCode: string) => {
      return medicalSpecialities?.find((medicalSpeciality) => medicalSpeciality.speciality_code === specialityCode)
        ?.name;
    },
    [medicalSpecialities]
  );

  return { getMedicalSpecialityName, medicalSpecialities };
};
