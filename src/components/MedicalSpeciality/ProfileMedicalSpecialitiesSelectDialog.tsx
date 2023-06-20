import React from 'react';
import { Modal } from '../Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '../Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '../Parts/Button/PrimaryButton';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { CheckBox } from '../Parts/Form/CheckBox';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { ProfileMedicalSpecialities } from './ProfileMedicalSpecialities';

export type ProfileMedicalSpecialitiesSelectDialogProps = {
  defaultSelectedMedicalSpecialities: MedicalSpecialityEntity[];
  onChange: (medicalSpecialities: MedicalSpecialityEntity[]) => void;
  setShowModal: (isShow: boolean) => void;
};

export const ProfileMedicalSpecialitiesSelectDialog = (props: ProfileMedicalSpecialitiesSelectDialogProps) => {
  const { setShowModal } = props;
  const {
    getMedicalSpecialitiesForCategory,
    getSelectedCountForCategory,
    isCategoryOpened,
    isMedicalSpecialitySelected,
    medicalSpecialityCategories,
    moveSelectedMedicalSpeciality,
    selectedMedicalSpecialities,
    submit,
    toggleCategory,
    toggleMedicalSpeciality,
  } = useMedicalSpecialitiesSelectDialog(props);

  return (
    <Modal setShowModal={setShowModal} className={`lg:w-[740px]`}>
      <div className="mx-6 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="所属科を選択する" onClose={() => setShowModal(false)} />
        <div className="mt-4 text-block-gray">選択した順番でコンサル依頼先の優先度を指定できます</div>
        <div className="mt-10 flex flex-col gap-2">
          {medicalSpecialityCategories?.map((medicalSpecialityCategory) => (
            <>
              <MedicalSpecialityCategorySelect
                key={medicalSpecialityCategory.id}
                medicalSpecialityCategory={medicalSpecialityCategory}
                isSelected={isCategoryOpened(medicalSpecialityCategory.id)}
                onClick={() => toggleCategory(medicalSpecialityCategory.id)}
                selectedCount={getSelectedCountForCategory(medicalSpecialityCategory.id)}
              />
              {isCategoryOpened(medicalSpecialityCategory.id) && (
                <div className="my-4 grid grid-cols-2 gap-y-4 text-sm lg:mx-4 lg:grid-cols-3">
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
        <ProfileMedicalSpecialities
          moveSelectedMedicalSpeciality={moveSelectedMedicalSpeciality}
          selectedMedicalSpecialities={selectedMedicalSpecialities}
          toggleMedicalSpeciality={toggleMedicalSpeciality}
        />
        <div className="mt-10">
          <PrimaryButton type="button" onClick={submit} className="mx-auto">
            決定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
