import { RefObject, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { openModalCountState } from '@/globalStates/modal';
import { ModalPropsType } from './Modal';

let modalCount = 0;
let modalStack: RefObject<HTMLDivElement>[] = []; // アクティブなモーダルの参照を保持

export const useModal = (props: ModalPropsType) => {
  const { setShowModal } = props;
  const setOpenModalCount = useSetRecoilState(openModalCountState);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    // 前のモーダルのスクロールを無効化
    const lastModalRef = modalStack[modalStack.length - 1];
    if (lastModalRef && lastModalRef.current) {
      lastModalRef.current.style.overflow = 'hidden';
    }
    // モーダルのスタックに現在のモーダルを追加
    modalStack.push(modalRef);

    setOpenModalCount((prev) => prev + 1);
    modalCount += 1;

    return () => {
      modalCount -= 1;
      setOpenModalCount(modalCount);
      if (modalCount <= 0) {
        setOpenModalCount(0);
      }

      // モーダルのスタックから現在のモーダルを削除
      modalStack = modalStack.filter((ref) => ref !== modalRef);

      // 残っている一番手前のモーダルのスクロールを再有効化
      const lastModalRef = modalStack[modalStack.length - 1];
      if (lastModalRef && lastModalRef.current) {
        lastModalRef.current.style.overflow = 'auto';
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
