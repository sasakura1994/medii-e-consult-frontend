import React from 'react';
import { useModal } from './useModal';

export type ModalPropsType = {
  children: React.ReactNode;
  className?: string;
  isCenter?: boolean;
  setShowModal?: (isShow: boolean) => void;
};

export const Modal: React.FC<ModalPropsType> = (props) => {
  const { children, className } = props;
  const { hideModal, modalRef } = useModal(props);

  return (
    <div
      ref={modalRef}
      className={`modal fixed left-0 top-0 z-[200] w-screen overflow-y-auto bg-bg-overlay ${
        props.isCenter === true ? 'flex items-center justify-center' : ''
      }`}
      style={{ height: '100dvh' }}
      onMouseDown={hideModal}
    >
      <div
        className={`rounded border border-[#d5d5d5] bg-white ${className} z-[210] mx-auto ${
          props.isCenter === true ? '' : 'my-10'
        }`}
        role="dialog"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
