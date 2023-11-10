import { RefObject, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { openModalCountState } from '@/globalStates/modal';
import { ModalPropsType } from './Modal';

let modalCount = 0;
let activeModalRef: RefObject<HTMLDivElement> | null = null; // アクティブなモーダルの参照を保持

export const useModal = (props: ModalPropsType) => {
  const { setShowModal } = props;
  const setOpenModalCount = useSetRecoilState(openModalCountState);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }

    // モーダルのカウントを増やし、必要に応じてbodyのスタイルを変更
    setOpenModalCount((prev) => prev + 1);
    modalCount += 1;

    if (activeModalRef && activeModalRef.current) {
      // 前のモーダルのスクロールを無効化
      activeModalRef.current.style.overflow = 'hidden';
    }
    activeModalRef = modalRef; // 新しいモーダルをアクティブに設定

    return () => {
      // モーダルのカウントを減らし、必要に応じてbodyのスタイルを元に戻す
      modalCount -= 1;
      if (modalCount <= 0) {
        setOpenModalCount(0);
      }

      if (activeModalRef === modalRef) {
        if (activeModalRef.current) {
          // モーダルを閉じるときにスクロールを再有効化
          activeModalRef.current.style.overflow = 'auto';
          activeModalRef = null;
        }
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
