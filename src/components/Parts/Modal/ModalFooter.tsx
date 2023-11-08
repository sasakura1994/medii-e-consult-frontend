import React, { ReactNode } from 'react';
import { useModalFooter } from './useModalFooter';

export type ModalFooterProps = {
  isUseFooter?: boolean;
  closeButton?: ReactNode;
  submitButton?: ReactNode;
};

export const ModalFooter = (props: ModalFooterProps) => {
  const { isUseFooter = false, closeButton, submitButton } = props;
  const { flexDirection, closeButtonRef, submitButtonRef } = useModalFooter();

  if (!isUseFooter) return <></>;
  return (
    <div className={'flex items-center justify-center gap-2 self-stretch p-4 lg:justify-end ' + flexDirection}>
      {closeButton && <div ref={closeButtonRef}>{closeButton}</div>}
      {submitButton && <div ref={submitButtonRef}>{submitButton}</div>}
    </div>
  );
};
