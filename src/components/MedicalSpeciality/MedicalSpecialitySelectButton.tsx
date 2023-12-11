import React from 'react';
import { useMedicalSpecialitySelectButton } from './useMedicalSpecialitySelectButton';
import { MedicalSpecialitySelectDialog } from './MedicalSpecialitySelectDialog';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';

export type MedicalSpecialitySelectButtonProps = {
  specialityCode: string;
  onChange: (specialityCode: string) => void;
  isGroup?: boolean;
};

export const MedicalSpecialitySelectButton: React.FC<MedicalSpecialitySelectButtonProps> = (
  props: MedicalSpecialitySelectButtonProps
) => {
  const { isOpen, medicalSpecialityName, setIsOpen } = useMedicalSpecialitySelectButton(props);
  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const { onChange, specialityCode, isGroup } = props;

  return (
    <>
      <a
        href="#"
        className="flex items-center rounded-md border border-block-gray px-4 py-2"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <div className="grow">{medicalSpecialityName || '担当科を選択'}</div>
        <img src="icons/pull.svg" alt="" width="16" />
      </a>
      {isOpen && (
        <MedicalSpecialitySelectDialog
          onChange={(specialityCode) => {
            setIsOpen(false);
            onChange(specialityCode);
          }}
          setShowModal={setIsOpen}
          medicalSpecialities={medicalSpecialities}
          defaultSpecialityCode={specialityCode}
          isGroup={isGroup}
        />
      )}
    </>
  );
};
