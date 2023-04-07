import React from 'react';
import { Modal } from '../Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '../Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '../Parts/Button/PrimaryButton';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { CheckBox } from '../Parts/Form/CheckBox';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { OutlinedSquareButton } from '../Parts/Button/OutlinedSquareButton';
import { SelectedMedicalSpecialities } from './SelectedMedicalSpecialities';

export type MedicalSpecialitiesSelectDialogProps = {
  defaultSelectedMedicalSpecialities: MedicalSpecialityEntity[];
  onChange: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  setShowModal: (isShow: boolean) => void;
};

export const MedicalSpecialitiesSelectDialog: React.FC<
  MedicalSpecialitiesSelectDialogProps
> = (props: MedicalSpecialitiesSelectDialogProps) => {
  const { setShowModal } = props;
  const {
    getMedicalSpecialitiesForCategory,
    getSelectedCountForCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
    moveSelectedMedicalSpeciality,
    medicalSpecialities,
    selectedMedicalSpecialities,
    setSelectedMedicalSpecialities,
    submit,
    toggleCategory,
    toggleMedicalSpeciality,
  } = useMedicalSpecialitiesSelectDialog(props);

  return (
    <Modal setShowModal={setShowModal} className={`lg:w-[740px]`}>
      <div className="my-10 mx-6 lg:mx-20">
        <ModalTitleWithCloseButton
          title="診療科で指定する"
          onClose={() => setShowModal(false)}
        />
        <div className="mt-4 text-block-gray">
          選択した順番でコンサル依頼先の優先度を指定できます
        </div>
        <div className="mt-10 flex flex-col gap-2">
          {medicalSpecialityCategories?.map((medicalSpecialityCategory) => (
            <>
              <MedicalSpecialityCategorySelect
                key={medicalSpecialityCategory.id}
                medicalSpecialityCategory={medicalSpecialityCategory}
                isSelected={isCategoryOpened(medicalSpecialityCategory.id)}
                onClick={() => toggleCategory(medicalSpecialityCategory.id)}
                selectedCount={getSelectedCountForCategory(
                  medicalSpecialityCategory.id
                )}
              />
              {isCategoryOpened(medicalSpecialityCategory.id) && (
                <div className="my-4 grid grid-cols-2 gap-y-4 text-sm lg:mx-4 lg:grid-cols-3">
                  {getMedicalSpecialitiesForCategory(
                    medicalSpecialityCategory.id
                  ).map((medicalSpeciality) => (
                    <CheckBox
                      key={medicalSpeciality.speciality_code}
                      label={medicalSpeciality.name}
                      name="medical_specialityies[]"
                      value={medicalSpeciality.speciality_code}
                      checked={isMedicalSpecialitySelected(
                        medicalSpeciality.speciality_code
                      )}
                      onChange={() =>
                        toggleMedicalSpeciality(medicalSpeciality)
                      }
                    />
                  ))}
                </div>
              )}
            </>
          ))}
        </div>
        {selectedMedicalSpecialities.length > 0 && (
          <div className="mt-2 rounded border border-primary-light p-4">
            <div className="flex justify-between">
              <div className="flex grow items-center gap-2">
                <div className="text-lg font-bold">選択中の診療科</div>
                <div>
                  選択数：{selectedMedicalSpecialities.length}/
                  {medicalSpecialities?.length || 0}
                </div>
              </div>
              <div>
                <OutlinedSquareButton
                  type="button"
                  onClick={() => setSelectedMedicalSpecialities([])}
                >
                  選択をすべて解除
                </OutlinedSquareButton>
              </div>
            </div>
            {medicalSpecialityCategories && (
              <SelectedMedicalSpecialities
                medicalSpecialities={selectedMedicalSpecialities}
                medicalSpecialityCategories={medicalSpecialityCategories}
                onDelete={toggleMedicalSpeciality}
                moveSelectedMedicalSpeciality={moveSelectedMedicalSpeciality}
              />
            )}
          </div>
        )}
        <div className="mt-10">
          <PrimaryButton type="button" onClick={submit}>
            この診療科で指定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
