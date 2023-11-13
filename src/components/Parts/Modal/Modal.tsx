import React from 'react';
import { useModal } from './useModal';
import { ModalFooter, type ModalFooterProps } from './ModalFooter';

export type ModalPropsType = {
  children: React.ReactNode;
  pcWidth?: '600' | '400';
  className?: string;
  isCenter?: boolean;
  setShowModal?: (isShow: boolean) => void;
  dataTestId?: string;
} & ModalFooterProps;

export const Modal: React.FC<ModalPropsType> = (props) => {
  const { isCenter, children, pcWidth = '600', className, dataTestId, ...ModalFooterProps } = props;
  const { hideModal, modalRef } = useModal(props);
  const pcWidthClass = `w-full lg:w-[${pcWidth}px]`;
  return (
    <div
      className={`fixed left-0 top-0 z-[200] flex w-screen overflow-hidden bg-bg-overlay ${
        isCenter === true ? 'flex items-center justify-center' : ''
      }`}
      style={{ height: '100dvh' }}
      onMouseDown={hideModal}
      data-testid={dataTestId}
    >
      <div
        className={`my-auto overflow-x-hidden mx-4 
          rounded-lg border border-[#d5d5d5] bg-white
         lg:mx-auto ${className} z-[210] ${isCenter === true ? '' : 'my-10'}
         ${pcWidthClass}`}
        role="dialog"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div ref={modalRef} className="max-h-[80dvh] overflow-y-auto overscroll-y-contain">
          {children}
        </div>
        <div className="mt-auto">
          <ModalFooter {...ModalFooterProps} />
        </div>
      </div>
    </div>
  );
};
