import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { MedicalCareerSpecialitiesProps } from './MedicalCareerSpecialities';

export type UseMedicalCareer = {
  isMedicalSpecialitiesSelectDialogShown: boolean;
  selectedMedicalSpecialities: MedicalSpecialityEntity[];
  setIsMedicalSpecialitiesSelectDialogShown: Dispatch<SetStateAction<boolean>>;
};

export const useMedicalCareerSpecialities = (props: MedicalCareerSpecialitiesProps): UseMedicalCareer => {
  const { profile } = props;
  const [isMedicalSpecialitiesSelectDialogShown, setIsMedicalSpecialitiesSelectDialogShown] = useState(false);

  const { medicalSpecialities } = useMedicalSpeciality();

  const selectedMedicalSpecialities = useMemo((): MedicalSpecialityEntity[] => {
    if (!profile || !medicalSpecialities) {
      return [];
    }

    const result: MedicalSpecialityEntity[] = [];

    if (profile.speciality_2 !== '') {
      const medicalSpeciality = medicalSpecialities.find(
        (medicalSpeciality) => medicalSpeciality.speciality_code === profile.speciality_2
      );
      if (!medicalSpeciality) {
        return result;
      }
      result.push(medicalSpeciality);
    }
    if (profile.speciality_3 !== '') {
      const medicalSpeciality = medicalSpecialities.find(
        (medicalSpeciality) => medicalSpeciality.speciality_code === profile.speciality_3
      );
      if (!medicalSpeciality) {
        return result;
      }
      result.push(medicalSpeciality);
    }
    if (profile.speciality_4 !== '') {
      const medicalSpeciality = medicalSpecialities.find(
        (medicalSpeciality) => medicalSpeciality.speciality_code === profile.speciality_4
      );
      if (!medicalSpeciality) {
        return result;
      }
      result.push(medicalSpeciality);
    }

    return result;
  }, [profile, medicalSpecialities]);

  return {
    isMedicalSpecialitiesSelectDialogShown,
    selectedMedicalSpecialities,
    setIsMedicalSpecialitiesSelectDialogShown,
  };
};
