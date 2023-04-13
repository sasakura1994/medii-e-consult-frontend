import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';
import { useMedicalSpecialitySelectButton } from './useMedicalSpecialitySelectButton';
import { MedicalSpecialitySelectDialog } from './MedicalSpecialitySelectDialog';

export type MedicalSpecialitySelectButtonProps = {
  specialityCode: string;
  onChange: (specialityCode: string) => void;
};

export const MedicalSpecialitySelectButton: React.FC<
  MedicalSpecialitySelectButtonProps
> = (props: MedicalSpecialitySelectButtonProps) => {
  const { isOpen, medicalSpecialityName, setIsOpen } =
    useMedicalSpecialitySelectButton(props);
  const { onChange, specialityCode } = props;

  return (
    <>
      <a
        href="#"
        className="flex items-center rounded-md border border-block-gray px-4 py-3"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(true);
        }}
      >
        <div className="grow">{medicalSpecialityName || '担当科を選択'}</div>
        <img src="/icons/pull.svg" alt="" width="16" />
      </a>
      {isOpen && (
        <MedicalSpecialitySelectDialog
          onChange={(specialityCode) => {
            setIsOpen(false);
            onChange(specialityCode);
          }}
          setShowModal={setIsOpen}
          defaultSpecialityCode={specialityCode}
        />
      )}
    </>
  );
};
