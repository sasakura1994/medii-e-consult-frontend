import React from 'react';
import { Modal, ModalPropsType } from '../Parts/Modal/Modal';
import { ModalTitleWithCloseButton } from '../Parts/Modal/ModalTitleWithCloseButton';
import { PrimaryButton } from '../Parts/Button/PrimaryButton';
import { useMedicalSpecialitiesSelectDialog } from './useMedicalSpecialitiesSelectDialog';
import { MedicalSpecialityCategorySelect } from './MedicalSpecialityCategorySelect';

type Props = Pick<ModalPropsType, 'setShowModal'> & {
  test: string;
};

export const MedicalSpecialitiesSelectDialog: React.FC<Props> = ({
  setShowModal,
}: Props) => {
  const { medicalSpecialityCategories } = useMedicalSpecialitiesSelectDialog();

  return (
    <Modal setShowModal={setShowModal} width={740}>
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
            <MedicalSpecialityCategorySelect
              key={medicalSpecialityCategory.id}
              medicalSpecialityCategory={medicalSpecialityCategory}
              isSelected={false}
              selectedCount={0}
            />
          ))}
        </div>
        <div className="mt-10">
          <PrimaryButton type="button">この診療科で指定</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
