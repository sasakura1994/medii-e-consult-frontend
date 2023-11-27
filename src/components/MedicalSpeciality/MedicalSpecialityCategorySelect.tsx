import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';
import React from 'react';

type Props = {
  medicalSpecialityCategory: MedicalSpecialityCategoryEntity;
  isSelected: boolean;
  onClick: () => void;
  selectedCount: number;
};

export const MedicalSpecialityCategorySelect: React.FC<Props> = ({
  medicalSpecialityCategory,
  isSelected,
  onClick,
  selectedCount,
}: Props) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div
        className={`flex items-center justify-between rounded ${isSelected ? 'bg-primary-light' : 'bg-bg'} px-4 py-2`}
      >
        <div className="grow">
          <span className="font-bold">{medicalSpecialityCategory.name}</span>
          <span>（{selectedCount}件選択中）</span>
        </div>
        <div className="grow-0">
          <img src="icons/arrow_down.svg" width="12" className={isSelected ? 'rotate-180 transform' : ''} />
        </div>
      </div>
    </a>
  );
};
