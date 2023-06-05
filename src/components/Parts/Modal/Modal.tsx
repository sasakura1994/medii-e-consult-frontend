import React from 'react';
import { useModal } from './useModal';

export type ModalPropsType = {
  children: React.ReactNode;
  className?: string;
  setShowModal?: (isShow: boolean) => void;
  isBlockModal?: boolean;
};

export const Modal: React.FC<ModalPropsType> = (props) => {
  const { children, className, isBlockModal } = props;
  const { hideModal, modalRef } = useModal(props);

  return (
    <div
      ref={modalRef}
      className="modal fixed top-0 left-0 z-[200] h-full w-full overflow-y-auto bg-black/20 lg:h-screen lg:w-screen"
      onClick={() => {
        if (!isBlockModal) {
          hideModal();
        }
      }}
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
