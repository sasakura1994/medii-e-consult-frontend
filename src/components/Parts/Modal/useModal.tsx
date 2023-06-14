import React from 'react';
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { ModalPropsType } from './Modal';

let modalCount = 0;

export const useModal = (props: ModalPropsType) => {
  const { setShowModal } = props;
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    if (modalCount === 0) {
      disableBodyScroll(modalRef.current);
    }

    modalCount += 1;

    return () => {
      modalCount -= 1;
      if (modalCount === 0) {
        clearAllBodyScrollLocks();
      }
    };
  }, [modalRef]);

  const hideModal = () => {
    if (setShowModal) {
      setShowModal(false);
    }
  };

  return { hideModal, modalRef };
};
