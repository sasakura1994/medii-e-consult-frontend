import { useEffect, useRef } from 'react';
import { ModalPropsType } from './Modal';
import { useSetRecoilState } from 'recoil';
import { openModalCountState } from '@/globalStates/modal';

let modalCount = 0;

export const useModal = (props: ModalPropsType) => {
  const { setShowModal } = props;
  const setOpenModalCount = useSetRecoilState(openModalCountState);
  const modalRef = useRef(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    setOpenModalCount((prev) => prev + 1);

    modalCount += 1;

    return () => {
      modalCount -= 1;
      if (modalCount <= 0) {
        setOpenModalCount(0);
      }
    };
  }, [modalRef, setOpenModalCount]);

  const hideModal = () => {
    if (setShowModal) {
      setShowModal(false);
    }
  };

  return { hideModal, modalRef };
};
