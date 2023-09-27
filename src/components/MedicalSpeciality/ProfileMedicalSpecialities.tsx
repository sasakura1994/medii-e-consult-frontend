import React from 'react';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { SelectedMedicalSpeciality } from './SelectedMedicalSpeciality';
import { useFetchMedicalSpecialityCategories } from '@/hooks/api/medicalCategoryCategory/useFetchMedicalSpecialityCategories';

export type Props = {
  moveSelectedMedicalSpeciality: (dragIndex: number, hoverIndex: number) => void;
  selectedMedicalSpecialities: MedicalSpecialityEntity[];
  toggleMedicalSpeciality: (toggledMedicalSpeciality: MedicalSpecialityEntity) => void;
};

export const ProfileMedicalSpecialities = (props: Props) => {
  const { moveSelectedMedicalSpeciality, selectedMedicalSpecialities, toggleMedicalSpeciality } = props;

  const { medicalSpecialityCategories } = useFetchMedicalSpecialityCategories();

  if (!medicalSpecialityCategories) {
    return <></>;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      {selectedMedicalSpecialities.length > 0 && (
        <div className="mt-2 rounded border border-primary-light p-4">
          <div className="text-lg font-bold">所属科</div>
          {medicalSpecialityCategories && (
            <div className="mt-6 flex flex-col gap-[10px]">
              <SelectedMedicalSpeciality
                key={selectedMedicalSpecialities[0].speciality_code}
                index={0}
                medicalSpeciality={selectedMedicalSpecialities[0]}
                medicalSpecialityCategory={medicalSpecialityCategories.find(
                  (medicalSpecialityCategory) =>
                    medicalSpecialityCategory.id === selectedMedicalSpecialities[0].medical_speciality_category_id
                )}
                onDelete={() => toggleMedicalSpeciality(selectedMedicalSpecialities[0])}
                moveItem={moveSelectedMedicalSpeciality}
              />
            </div>
          )}
        </div>
      )}
      {selectedMedicalSpecialities.length > 1 && (
        <div className="mt-2 rounded border border-primary-light p-4">
          <div className="flex justify-between">
            <div className="flex grow items-center gap-2">
              <div className="text-lg font-bold">担当科</div>
              <div className="text-sm">（対応可能な科目、最大３件まで）</div>
            </div>
          </div>
          {medicalSpecialityCategories && (
            <div className="mt-6 flex flex-col gap-[10px]">
              {selectedMedicalSpecialities.slice(1).map((medicalSpeciality, index) => (
                <SelectedMedicalSpeciality
                  key={medicalSpeciality.speciality_code}
                  index={1 + index}
                  medicalSpeciality={medicalSpeciality}
                  medicalSpecialityCategory={medicalSpecialityCategories.find(
                    (medicalSpecialityCategory) =>
                      medicalSpecialityCategory.id === medicalSpeciality.medical_speciality_category_id
                  )}
                  onDelete={() => toggleMedicalSpeciality(medicalSpeciality)}
                  moveItem={moveSelectedMedicalSpeciality}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </DndProvider>
  );
};
