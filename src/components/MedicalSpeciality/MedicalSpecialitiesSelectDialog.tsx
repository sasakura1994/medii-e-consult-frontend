import React from 'react';
import { Modal, ModalPropsType } from '../Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '../Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '../Parts/Button/PrimaryButton';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { CheckBox } from '../Parts/Form/CheckBox';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

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
    isCategoryOpened,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
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
        <div className="mt-10">
          <PrimaryButton type="button">この診療科で指定</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
