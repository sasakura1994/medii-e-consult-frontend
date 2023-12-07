// TODO: プロフィール登録で同じコンポーネントを使う予定なので共通化する
import { useMedicalSpecialitySelect } from '@/components/MedicalSpeciality/useMedicalSpecialitySelect';
import { moveItem } from '@/libs/dnd';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useState, useMemo, useCallback } from 'react';
import { MedicalSpecialitiesSelectDialogProps } from './MedicalSpecialitiesSelectDialog';

export const useMedicalSpecialitiesSelectDialog = (
  props: MedicalSpecialitiesSelectDialogProps,
  medicalSpecialities?: MedicalSpecialityEntity[]
) => {
  const { defaultSelectedMedicalSpecialities, onChange, maxSelectableSpecialities } = props;
  const { getMedicalSpecialitiesForCategory, isCategoryOpened, medicalSpecialityCategories, toggleCategory } =
    useMedicalSpecialitySelect(medicalSpecialities);

  const [selectedMedicalSpecialities, setSelectedMedicalSpecialities] = useState<MedicalSpecialityEntity[]>(
    defaultSelectedMedicalSpecialities
  );

  const selectedSpecialityCodes = useMemo(
    () => selectedMedicalSpecialities.map((medicalSpeciality) => medicalSpeciality.speciality_code),
    [selectedMedicalSpecialities]
  );

  const isChanged = useMemo(() => {
    const defaultMedicalSpecialityCodes = defaultSelectedMedicalSpecialities.map(
      (medicalSpeciality) => medicalSpeciality.speciality_code
    );
    defaultMedicalSpecialityCodes.sort();
    const selected = [...selectedSpecialityCodes];
    selected.sort();
    return defaultMedicalSpecialityCodes.join('') !== selected.join('');
  }, [defaultSelectedMedicalSpecialities, selectedSpecialityCodes]);

  const toggleMedicalSpeciality = useCallback(
    (toggledMedicalSpeciality: MedicalSpecialityEntity) => {
      if (selectedSpecialityCodes.includes(toggledMedicalSpeciality.speciality_code)) {
        setSelectedMedicalSpecialities((selectedMedicalSpecialities) =>
          selectedMedicalSpecialities.filter(
            (medicalSpeciality) => medicalSpeciality.speciality_code !== toggledMedicalSpeciality.speciality_code
          )
        );
        return;
      }

      if (selectedMedicalSpecialities.length >= (maxSelectableSpecialities ?? 3)) {
        return;
      }

      setSelectedMedicalSpecialities((selectedMedicalSpecialities) => [
        ...selectedMedicalSpecialities,
        toggledMedicalSpeciality,
      ]);
    },
    [maxSelectableSpecialities, selectedMedicalSpecialities.length, selectedSpecialityCodes]
  );

  const isMedicalSpecialitySelected = useCallback(
    (specialityCode: string) => selectedSpecialityCodes.includes(specialityCode),
    [selectedSpecialityCodes]
  );

  const moveSelectedMedicalSpeciality = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setSelectedMedicalSpecialities(moveItem(selectedMedicalSpecialities, dragIndex, hoverIndex));
    },
    [selectedMedicalSpecialities]
  );

  const submit = useCallback(() => {
    onChange(selectedMedicalSpecialities);
  }, [onChange, selectedMedicalSpecialities]);

  return {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    isChanged,
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
