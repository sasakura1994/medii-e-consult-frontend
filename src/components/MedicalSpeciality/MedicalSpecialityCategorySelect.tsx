import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';
import React from 'react';

type Props = {
  medicalSpecialityCategory: MedicalSpecialityCategoryEntity;
  isSelected: boolean;
  selectedCount: number;
};

export const MedicalSpecialityCategorySelect: React.FC<Props> = ({
  medicalSpecialityCategory,
  isSelected,
  selectedCount,
}: Props) => {
  return (
    <div className="flex items-center justify-between rounded bg-bg py-2 px-4">
      <div className="grow">
        <span>{medicalSpecialityCategory.name}</span>
        <span>（{selectedCount}件選択中）</span>
      </div>
      <div className="grow-0">
        <img src="/icons/arrow_down.svg" width="12" />
      </div>
    </div>
  );
};
