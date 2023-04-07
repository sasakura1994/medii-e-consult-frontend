import React from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { ModalPropsType } from './Modal';

export const useModal = (props: ModalPropsType) => {
  const { setShowModal } = props;
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    disableBodyScroll(modalRef.current);
    return () => clearAllBodyScrollLocks();
  }, [modalRef]);

  const hideModal = () => {
    if (setShowModal) {
      setShowModal(false);
    }
  };

  return { hideModal, modalRef };
};
