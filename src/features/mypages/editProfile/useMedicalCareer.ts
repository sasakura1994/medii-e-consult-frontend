import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { MedicalCareerProps } from './MedicalCareer';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { moveItem } from '@/libs/dnd';

export type UseMedicalCareer = {
  isMedicalSpecialitiesSelectDialogShown: boolean;
  moveSelectedMedicalSpeciality: (dragIndex: number, hoverIndex: number) => void;
  selectedMedicalSpecialities: MedicalSpecialityEntity[];
  setIsMedicalSpecialitiesSelectDialogShown: Dispatch<SetStateAction<boolean>>;
  toggleMedicalSpeciality: (toggledMedicalSpeciality: MedicalSpecialityEntity) => void;
};

export const useMedicalCareer = (props: MedicalCareerProps): UseMedicalCareer => {
  const { profile, selectMedicalSpecialities } = props;
  const [isMedicalSpecialitiesSelectDialogShown, setIsMedicalSpecialitiesSelectDialogShown] = useState(false);

  const { medicalSpecialities } = useMedicalSpeciality();

  const selectedMedicalSpecialities = useMemo((): MedicalSpecialityEntity[] => {
    if (!profile || !medicalSpecialities) {
      return [];
    }

    const result: MedicalSpecialityEntity[] = [];

    if (profile.main_speciality !== '') {
      const medicalSpeciality = medicalSpecialities.find(
        (medicalSpeciality) => medicalSpeciality.speciality_code === profile.main_speciality
      );
      if (!medicalSpeciality) {
        return result;
      }
      result.push(medicalSpeciality);
    }
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

  const moveSelectedMedicalSpeciality = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      selectMedicalSpecialities(moveItem(selectedMedicalSpecialities, dragIndex, hoverIndex));
    },
    [selectMedicalSpecialities, selectedMedicalSpecialities]
  );

  const toggleMedicalSpeciality = useCallback(
    (toggledMedicalSpeciality: MedicalSpecialityEntity) => {
      const selectedSpecialityCodes = selectedMedicalSpecialities.map(
        (medicalSpeciality) => medicalSpeciality.speciality_code
      );

      if (selectedSpecialityCodes.includes(toggledMedicalSpeciality.speciality_code)) {
        selectMedicalSpecialities(
          selectedMedicalSpecialities.filter(
            (medicalSpeciality) => medicalSpeciality.speciality_code !== toggledMedicalSpeciality.speciality_code
          )
        );
      } else {
        selectMedicalSpecialities([...selectedMedicalSpecialities, toggledMedicalSpeciality]);
      }
    },
    [selectedMedicalSpecialities, selectMedicalSpecialities]
  );

  return {
    isMedicalSpecialitiesSelectDialogShown,
    moveSelectedMedicalSpeciality,
    selectedMedicalSpecialities,
    setIsMedicalSpecialitiesSelectDialogShown,
    toggleMedicalSpeciality,
  };
};
