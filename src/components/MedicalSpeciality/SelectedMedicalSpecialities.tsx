import React from 'react';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SelectedMedicalSpeciality } from './SelectedMedicalSpeciality';
import { MedicalSpecialityCategoryEntity } from '@/types/entities/medicalSpecialityCategoryEntity';

type Props = {
  medicalSpecialities: MedicalSpecialityEntity[];
  medicalSpecialityCategories: MedicalSpecialityCategoryEntity[];
  moveSelectedMedicalSpeciality: (
    dragIndex: number,
    hoverIndex: number
  ) => void;
  onDelete: (medicalSpeciality: MedicalSpecialityEntity) => void;
};

export const SelectedMedicalSpecialities: React.FC<Props> = ({
  medicalSpecialities,
  medicalSpecialityCategories,
  moveSelectedMedicalSpeciality,
  onDelete,
}: Props) => {
  return (
    <div className="mt-6 flex flex-col gap-[10px]">
      <DndProvider backend={HTML5Backend}>
        {medicalSpecialities.map((medicalSpeciality, index) => (
          <SelectedMedicalSpeciality
            key={medicalSpeciality.speciality_code}
            index={index}
            medicalSpeciality={medicalSpeciality}
            medicalSpecialityCategory={medicalSpecialityCategories.find(
              (medicalSpecialityCategory) =>
                medicalSpecialityCategory.id ===
                medicalSpeciality.medical_speciality_category_id
            )}
            onDelete={() => onDelete(medicalSpeciality)}
            moveItem={moveSelectedMedicalSpeciality}
          />
        ))}
      </DndProvider>
    </div>
  );
};
