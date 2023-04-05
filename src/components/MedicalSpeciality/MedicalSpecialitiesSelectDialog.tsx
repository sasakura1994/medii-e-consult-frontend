import React from 'react';
import { Modal, ModalPropsType } from '../Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '../Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '../Parts/Button/PrimaryButton';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { CheckBox } from '../Parts/Form/CheckBox';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { OutlinedSquareButton } from '../Parts/Button/OutlinedSquareButton';

export type MedicalSpecialitiesSelectDialogProps = Pick<
  ModalPropsType,
  'setShowModal'
> & {
  defaultSelectedMedicalSpecialities: MedicalSpecialityEntity[];
  onChange: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
};

export const MedicalSpecialitiesSelectDialog: React.FC<
  MedicalSpecialitiesSelectDialogProps
> = (props: MedicalSpecialitiesSelectDialogProps) => {
  const { setShowModal } = props;
  const {
    getMedicalSpecialitiesForCategory,
    getMedicalSpecialityCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
    medicalSpecialities,
    selectedMedicalSpecialities,
    setSelectedMedicalSpecialities,
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
                selectedCount={0}
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
            <div className="mt-6 flex flex-col gap-[10px]">
              {selectedMedicalSpecialities.map((medicalSpeciality, index) => (
                <div
                  key={medicalSpeciality.speciality_code}
                  className="flex h-[38px] items-center justify-between border border-bg pr-2"
                >
                  <div className="flex h-full grow">
                    <div className="flex h-full w-8 grow-0 items-center justify-center bg-bg">
                      <img
                        src="/icons/drag_indicator.svg"
                        width="24"
                        height="24"
                      />
                    </div>
                    <div className="flex w-10 shrink-0 grow-0 items-center justify-center text-center font-bold text-primary">
                      <div>{index + 1}</div>
                    </div>
                    <div className="flex grow items-center text-sm">
                      <div>
                        {medicalSpeciality.name}（
                        {getMedicalSpecialityCategory(
                          medicalSpeciality.medical_speciality_category_id
                        )?.name || ''}
                        ）
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="flex grow-0 items-center gap-[6px] text-sm text-block-gray"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMedicalSpeciality(medicalSpeciality);
                    }}
                  >
                    <img
                      src="/icons/close_gray.svg"
                      width="12"
                      height="12"
                      alt=""
                    />
                    <div>削除</div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10">
          <PrimaryButton type="button">この診療科で指定</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
