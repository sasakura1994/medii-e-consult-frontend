import React from 'react';
import { Modal } from './Modal';
import { PrimaryButton } from '../Button/PrimaryButton';

export type ModalPropsType = {
  children: React.ReactNode;
  className?: string;
  setShowModal: (isShow: boolean) => void;
  onSubmit?: () => void;
  title: string;
  labelText: string;
};

export const SeminarConfirmModal: React.FC<ModalPropsType> = (props) => {
  const { children, className, setShowModal, onSubmit, title, labelText } =
    props;

  return (
    <Modal setShowModal={setShowModal} className={`lg:w-[644px] ${className}`}>
      <div>
        <h1 className="text-2xl font-medium text-center pt-12 border">{title}</h1>
        {children}
        <div className="flex m-auto justify-center gap-4 mb-8">
          <PrimaryButton onClick={() => setShowModal(false)}>
            キャンセル
          </PrimaryButton>
          <PrimaryButton onClick={() => onSubmit && onSubmit()}>
            {labelText}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
