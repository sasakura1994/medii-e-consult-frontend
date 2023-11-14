import React, { useCallback, useMemo } from 'react';
import { Modal } from '../Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '../Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '../Parts/Button/PrimaryButton';
import { useMedicalSpecialitySelectDialog } from './useMedicalSpecialitySelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';
import { Radio } from '../Parts/Form/Radio';

export type MedicalSpecialitySelectDialogProps = {
  defaultSpecialityCode: string;
  onChange: (specialityCode: string) => void;
  setShowModal: (isShow: boolean) => void;
  isGroup?: boolean;
};

export const MedicalSpecialitySelectDialog: React.FC<MedicalSpecialitySelectDialogProps> = (
  props: MedicalSpecialitySelectDialogProps
) => {
  const { setShowModal, isGroup } = props;
  const {
    getMedicalSpecialitiesForCategory: getSpecialities,
    isCategoryOpened,
    medicalSpecialityCategories: medicalSpecialityCategorieList,
    selectedSpecialityCode,
    setSelectedSpecialityCode,
    submit,
    toggleCategory,
  } = useMedicalSpecialitySelectDialog(props);

  const medicalSpecialityCategories = useMemo(() => {
    if (
      isGroup &&
      medicalSpecialityCategorieList &&
      !medicalSpecialityCategorieList.some((category) => category.id === 'MDD')
    ) {
      // グループの場合、まだMDDがなければ追加
      return [{ id: 'MDD', name: '複数専門領域合同(MDD)' }, ...medicalSpecialityCategorieList];
    }
    return medicalSpecialityCategorieList;
  }, [isGroup, medicalSpecialityCategorieList]);

  const getMedicalSpecialitiesForCategory = useCallback(
    (id: string) => {
      const specialities = getSpecialities(id);
      if (isGroup && id === 'MDD' && !specialities.some((speciality) => speciality.speciality_code === 'MDD')) {
        // グループの場合はMDDを追加
        specialities.unshift({
          medical_speciality_category_id: 'MDD',
          name: '複数専門領域合同(MDD)',
          speciality_code: 'MDD',
          display_order: 0,
        });
      }
      return specialities;
    },
    [getSpecialities, isGroup]
  );

  return (
    <Modal setShowModal={setShowModal} className={`lg:w-[740px]`}>
      <div className="mx-6 my-10 lg:mx-20">
        <ModalTitleWithCloseButton title="専門科を選択する" onClose={() => setShowModal(false)} />
        <div className="mt-10 flex flex-col gap-2">
          {medicalSpecialityCategories?.map((medicalSpecialityCategory) => (
            <>
              <MedicalSpecialityCategorySelect
                key={medicalSpecialityCategory.id}
                medicalSpecialityCategory={medicalSpecialityCategory}
                isSelected={isCategoryOpened(medicalSpecialityCategory.id)}
                onClick={() => toggleCategory(medicalSpecialityCategory.id)}
                selectedCount={
                  getMedicalSpecialitiesForCategory(medicalSpecialityCategory.id)
                    .map((medicalSpeciality) => medicalSpeciality.speciality_code)
                    .includes(selectedSpecialityCode)
                    ? 1
                    : 0
                }
              />
              {isCategoryOpened(medicalSpecialityCategory.id) && (
                <div className="my-4 grid grid-cols-2 gap-y-4 text-sm lg:mx-4 lg:grid-cols-3">
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
            </>
          ))}
        </div>
        <div className="mt-10">
          <PrimaryButton type="button" onClick={submit} className="mx-auto">
            決定
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
