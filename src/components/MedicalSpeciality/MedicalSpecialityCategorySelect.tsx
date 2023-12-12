import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';
import React from 'react';

type Props = {
  medicalSpecialityCategory: MedicalSpecialityCategoryEntity;
  isSelected: boolean;
  onClick: () => void;
};

export const MedicalSpecialityCategorySelect: React.FC<Props> = ({
  medicalSpecialityCategory,
  isSelected,
  onClick,
}: Props) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="flex items-center justify-between">
        <div className="grow">
          <span className="font-bold">{medicalSpecialityCategory.name}</span>
        </div>
        <div className="grow-0">
          <img src="icons/chevron_down.svg" width="13" className={isSelected ? 'rotate-180 transform' : ''} alt="" />
        </div>
      </div>
    </a>
  );
};
