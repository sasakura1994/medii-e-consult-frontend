import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React from 'react';

type Props = {
  index: number;
  medicalSpeciality: MedicalSpecialityEntity;
  medicalSpecialityCategory: MedicalSpecialityCategoryEntity;
  onDelete: () => void;
};

export const SelectedMedicalSpeciality: React.FC<Props> = ({
  index,
  medicalSpeciality,
  medicalSpecialityCategory,
  onDelete,
}: Props) => {
  return (
    <div
      key={medicalSpeciality.speciality_code}
      className="flex h-[38px] items-center justify-between border border-bg pr-2"
    >
      <div className="flex h-full grow">
        <div className="flex h-full w-8 grow-0 items-center justify-center bg-bg">
          <img src="/icons/drag_indicator.svg" width="24" height="24" />
        </div>
        <div className="flex w-10 shrink-0 grow-0 items-center justify-center text-center font-bold text-primary">
          <div>{index + 1}</div>
        </div>
        <div className="flex grow items-center text-sm">
          <div>
            {medicalSpeciality.name}（{medicalSpecialityCategory.name}）
          </div>
        </div>
      </div>
      <a
        href="#"
        className="flex grow-0 items-center gap-[6px] text-sm text-block-gray"
        onClick={(e) => {
          e.preventDefault();
          onDelete();
        }}
      >
        <img src="/icons/close_gray.svg" width="12" height="12" alt="" />
        <div>削除</div>
      </a>
    </div>
  );
};
