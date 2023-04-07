import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';

type Props = {
  specialityCode: string;
  onChange: (medicalSpeciality: MedicalSpecialityEntity) => void;
};

export const MedicalSpecialitySelectButton: React.FC<Props> = (
  props: Props
) => {
  return (
    <a
      href="#"
      className="flex items-center rounded-md border border-block-gray px-4 py-3"
    >
      <div className="grow">担当科を選択</div>
      <img src="/icons/pull.svg" alt="" width="16" />
    </a>
  );
};
