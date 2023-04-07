import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';
import { MedicalSpecialitiesSelectDialogProps } from './MedicalSpecialitiesSelectDialog';
import { useMedicalSpecialitySelect } from './useMedicalSpecialitySelect';

export const useMedicalSpecialitiesSelectDialog = (
  props: MedicalSpecialitiesSelectDialogProps
) => {
  const { defaultSelectedMedicalSpecialities, onChange } = props;
  const {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    medicalSpecialityCategories,
    medicalSpecialities,
    toggleCategory,
  } = useMedicalSpecialitySelect();

  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] =
    React.useState<MedicalSpecialityEntity[]>(
      defaultSelectedMedicalSpecialities
    );

  const selectedSpecialityCodes = React.useMemo(
    () =>
      selectedMedicalSpecialities.map(
        (medicalSpeciality) => medicalSpeciality.speciality_code
      ),
    [selectedMedicalSpecialities]
  );

  const toggleMedicalSpeciality = React.useCallback(
    (toggledMedicalSpeciality: MedicalSpecialityEntity) => {
      if (
        selectedSpecialityCodes.includes(
          toggledMedicalSpeciality.speciality_code
        )
      ) {
        setSelectedMedicalSpecialities((selectedMedicalSpecialities) =>
          selectedMedicalSpecialities.filter(
            (medicalSpeciality) =>
              medicalSpeciality.speciality_code !==
              toggledMedicalSpeciality.speciality_code
          )
        );
      } else {
        setSelectedMedicalSpecialities((selectedMedicalSpecialities) => [
          ...selectedMedicalSpecialities,
          toggledMedicalSpeciality,
        ]);
      }
    },
    [selectedSpecialityCodes]
  );

  const isMedicalSpecialitySelected = React.useCallback(
    (specialityCode: string) =>
      selectedSpecialityCodes.includes(specialityCode),
    [selectedSpecialityCodes]
  );

  const moveSelectedMedicalSpeciality = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSelectedMedicalSpecialities((selectedMedicalSpecialities) => {
        const copy = [...selectedMedicalSpecialities];
        const dragging = copy.splice(dragIndex, 1);
        return [
          ...copy.slice(0, hoverIndex),
          dragging[0],
          ...copy.slice(hoverIndex),
        ];
      });
    },
    []
  );

  const submit = React.useCallback(() => {
    onChange(selectedMedicalSpecialities);
  }, [selectedMedicalSpecialities]);

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    moveSelectedMedicalSpeciality,
    medicalSpecialityCategories,
    medicalSpecialities,
    selectedMedicalSpecialities,
    setSelectedMedicalSpecialities,
    submit,
    toggleCategory,
    toggleMedicalSpeciality,
  };
};
