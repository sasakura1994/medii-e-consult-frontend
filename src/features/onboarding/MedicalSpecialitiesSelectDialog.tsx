// TODO: プロフィール登録で同じコンポーネントを使う予定なので共通化する
import React from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { SelectedMedicalSpecialities } from '@/components/MedicalSpeciality/SelectedMedicalSpecialities';
import { OutlinedSquareButton } from '@/components/Parts/Button/OutlinedSquareButton';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Modal } from '@/components/Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '@/components/Parts/Modal/ModalTitleWithCloseButton';
import { useFetchMedicalSpecialitiesWithContract } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialitiesWithContract';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';

export type MedicalSpecialitiesSelectDialogProps = {
  defaultSelectedMedicalSpecialities: MedicalSpecialityEntity[];
  maxSelectableSpecialities?: number;
  onChange: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  setShowModal: (isShow: boolean) => void;
};

export const MedicalSpecialitiesSelectDialog: React.FC<MedicalSpecialitiesSelectDialogProps> = (
  props: MedicalSpecialitiesSelectDialogProps
) => {
  const { setShowModal } = props;
  const { medicalSpecialities } = useFetchMedicalSpecialitiesWithContract();
  const {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
    moveSelectedMedicalSpeciality,
    selectedMedicalSpecialities,
    setSelectedMedicalSpecialities,
    submit,
    toggleCategory,
    toggleMedicalSpeciality,
  } = useMedicalSpecialitiesSelectDialog(props, medicalSpecialities);

  return (
    <Modal setShowModal={setShowModal}>
      <div className="mx-6 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="診療科で指定する" onClose={() => setShowModal(false)} />
        <div className="mt-4">選択した順番でコンサル依頼先の優先度を指定できます</div>
        <div className="mt-10 flex flex-col gap-6">
          {medicalSpecialityCategories?.map((medicalSpecialityCategory) => (
            <>
              <MedicalSpecialityCategorySelect
                key={medicalSpecialityCategory.id}
                medicalSpecialityCategory={medicalSpecialityCategory}
                isSelected={isCategoryOpened(medicalSpecialityCategory.id)}
                onClick={() => toggleCategory(medicalSpecialityCategory.id)}
              />
              {isCategoryOpened(medicalSpecialityCategory.id) && (
                <div className="grid grid-cols-2 gap-y-2 lg:grid-cols-3">
                  {getMedicalSpecialitiesForCategory(medicalSpecialityCategory.id).map((medicalSpeciality) => (
                    <CheckBox
                      key={medicalSpeciality.speciality_code}
                      label={medicalSpeciality.name}
                      name="medical_specialityies[]"
                      value={medicalSpeciality.speciality_code}
                      checked={isMedicalSpecialitySelected(medicalSpeciality.speciality_code)}
                      onChange={() => toggleMedicalSpeciality(medicalSpeciality)}
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
                  選択数：{selectedMedicalSpecialities.length}/{medicalSpecialities?.length || 0}
                </div>
              </div>
              <div>
                <OutlinedSquareButton type="button" onClick={() => setSelectedMedicalSpecialities([])}>
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
          <PrimaryButton type="button" onClick={submit} className="mx-auto">
            この診療科で指定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
