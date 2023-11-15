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
  const { children, className, setShowModal, onSubmit, title, labelText } = props;

  return (
    <Modal setShowModal={setShowModal} className={`lg:w-[644px] ${className}`} isCenter>
      <div>
        <h1 className="border pt-12 text-center text-2xl font-medium">{title}</h1>
        {children}
        <div className="m-auto mb-8 flex justify-center gap-4">
          <PrimaryButton onClick={() => setShowModal(false)}>キャンセル</PrimaryButton>
          <PrimaryButton onClick={() => onSubmit && onSubmit()}>{labelText}</PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
