import React from 'react';
import PrimaryButton from '@/components/Button/PrimaryButton';
import TertiaryButton from '@/components/Button/TertiaryButton';
import { CheckBox } from '@/components/Parts/Form/CheckBox';
import { Modal } from '@/components/Parts/Modal/Modal';
import { Heading } from '@/components/Parts/Text/Heading';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';

export type OnboardingMedicalSpecialitiesSelectDialogProps = {
  defaultSelectedMedicalSpecialities: MedicalSpecialityEntity[];
  mainSpeciality: string;
  onChange: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  setShowModal: (isShow: boolean) => void;
  title?: string;
  description?: string;
  maxSelectableSpecialities: number;
  medicalSpecialities: MedicalSpecialityEntity[];
};

export const OnboardingMedicalSpecialitiesSelectDialog = (props: OnboardingMedicalSpecialitiesSelectDialogProps) => {
  const { mainSpeciality, setShowModal, title, description, medicalSpecialities } = props;
  const {
    getMedicalSpecialitiesForCategory,
    isCategoryOpened,
    isChanged,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
    submit,
    toggleCategory,
    toggleMedicalSpeciality,
  } = useMedicalSpecialitiesSelectDialog(props, medicalSpecialities);

  return (
    <Modal
      setShowModal={setShowModal}
      className="lg:w-[600px]"
      isUseFooter
      closeButton={
        <TertiaryButton onClick={() => setShowModal(false)} size="large" className="w-full">
          閉じる
        </TertiaryButton>
      }
      submitButton={
        <PrimaryButton type="button" size="large" onClick={submit} className="w-full px-4" disabled={!isChanged}>
          完了
        </PrimaryButton>
      }
    >
      <div className="mx-4 mt-6">
        {title && <Heading>{title}</Heading>}
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
                    <CheckBox
                      key={medicalSpeciality.speciality_code}
                      label={medicalSpeciality.name}
                      name="medical_specialityies[]"
                      value={medicalSpeciality.speciality_code}
                      checked={isMedicalSpecialitySelected(medicalSpeciality.speciality_code)}
                      disabled={medicalSpeciality.speciality_code === mainSpeciality}
                      onChange={() => toggleMedicalSpeciality(medicalSpeciality)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};
