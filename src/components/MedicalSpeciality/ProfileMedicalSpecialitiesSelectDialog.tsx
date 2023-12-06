import React from 'react';
import { Modal } from '../Parts/Modal/Modal';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { CheckBox } from '../Parts/Form/CheckBox';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { Heading } from '../Parts/Text/Heading';
import TertiaryButton from '../Button/TertiaryButton';
import PrimaryButton from '../Button/PrimaryButton';

export type ProfileMedicalSpecialitiesSelectDialogProps = {
  defaultSelectedMedicalSpecialities: MedicalSpecialityEntity[];
  mainSpeciality: string;
  onChange: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  setShowModal: (isShow: boolean) => void;
};

export const ProfileMedicalSpecialitiesSelectDialog = (props: ProfileMedicalSpecialitiesSelectDialogProps) => {
  const { mainSpeciality, setShowModal } = props;
  const { medicalSpecialities } = useFetchMedicalSpecialities();
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
        <TertiaryButton onClick={() => setShowModal(false)} size="large" className="flex-1 lg:flex-initial">
          閉じる
        </TertiaryButton>
      }
      submitButton={
        <PrimaryButton
          type="button"
          size="large"
          onClick={submit}
          className="flex-1 px-4 lg:flex-initial"
          disabled={!isChanged}
        >
          決定
        </PrimaryButton>
      }
    >
      <div className="mx-4 mt-6">
        <Heading>担当科を選択</Heading>
        <div className="mt-8">担当科は、あとから編集可能です。</div>
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
