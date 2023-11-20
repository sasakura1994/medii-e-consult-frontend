import React, { ReactNode } from 'react';
import { Modal } from '../Parts/Modal/Modal';
import { useMedicalSpecialitySelectDialog } from './useMedicalSpecialitySelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { Radio } from '../Parts/Form/Radio';
import { Heading } from '../Parts/Text/Heading';
import TertiaryButton from '../Button/TertiaryButton';
import PrimaryButton from '../Button/PrimaryButton';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';

export type MedicalSpecialitySelectDialogProps = {
  defaultSpecialityCode: string;
  required?: boolean;
  medicalSpecialities?: MedicalSpecialityEntity[];
  description?: ReactNode;
  onChange: (specialityCode: string) => void;
  setShowModal: (isShow: boolean) => void;
};

export const MedicalSpecialitySelectDialog = (props: MedicalSpecialitySelectDialogProps) => {
  const { required = false, description, setShowModal } = props;
  const {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    medicalSpecialityCategories,
    selectedSpecialityCode,
    setSelectedSpecialityCode,
    submit,
    toggleCategory,
  } = useMedicalSpecialitySelectDialog(props);

  return (
    <Modal setShowModal={setShowModal} className="relative pb-[88px] lg:w-[600px]">
      <div className="mx-4 my-6">
        <Heading>所属科を選択</Heading>
        {description && <div className="mt-8">{description}</div>}
        <div className="mt-6 flex flex-col gap-6">
          {medicalSpecialityCategories?.map((medicalSpecialityCategory) => (
            <div key={medicalSpecialityCategory.id}>
              <MedicalSpecialityCategorySelect
                medicalSpecialityCategory={medicalSpecialityCategory}
                isSelected={isCategoryOpened(medicalSpecialityCategory.id)}
                onClick={() => toggleCategory(medicalSpecialityCategory.id)}
              />
              {isCategoryOpened(medicalSpecialityCategory.id) && (
                <div className="mt-2 grid grid-cols-2 gap-y-2 lg:grid-cols-3">
                  {getMedicalSpecialitiesForCategory(medicalSpecialityCategory.id).map((medicalSpeciality) => (
                    <Radio
                      key={medicalSpeciality.speciality_code}
                      label={medicalSpeciality.name}
                      name="medical_specialityies[]"
                      value={medicalSpeciality.speciality_code}
                      checked={selectedSpecialityCode === medicalSpeciality.speciality_code}
                      onChange={() => setSelectedSpecialityCode(medicalSpeciality.speciality_code)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            flex
            h-[88px]
            items-center
            justify-between
            gap-2
            bg-white
            px-4
            lg:justify-end
          "
        >
          <TertiaryButton onClick={() => setShowModal(false)} size="large" className="flex-1 lg:flex-initial">
            閉じる
          </TertiaryButton>
          <PrimaryButton
            type="button"
            size="large"
            onClick={submit}
            className="flex-1 px-4 lg:flex-initial"
            disabled={required && selectedSpecialityCode === ''}
          >
            決定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
