import React from 'react';
import { useModal } from './useModal';

export type ModalPropsType = {
  children: React.ReactNode;
  className?: string;
  guard?: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<ModalPropsType> = (props) => {
  const { children, className } = props;
  const { hideModal, modalRef } = useModal(props);

  return (
    <div
      ref={modalRef}
      className="modal fixed top-0 left-0 z-[200] h-screen w-screen overflow-y-auto bg-black/20"
      onClick={hideModal}
    >
      <div
        className={`rounded border border-[#d5d5d5] bg-white ${className} z-[210] mx-auto my-10`}
        role="dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
