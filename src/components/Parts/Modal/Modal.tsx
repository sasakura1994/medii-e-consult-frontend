import React from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '@/globalStates/modalState';

type PropsType = {
  children: React.ReactNode;
  isShow: boolean;
  guard?: boolean;
};

export const Modal: React.FC<PropsType> = (props) => {
  const { children, isShow, guard } = props;

  const setShowModal = useSetRecoilState(modalState);

  const hideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (guard) return;

    const targetElem = e.target as HTMLDivElement;

    if (targetElem.closest('#modal-content') === null) {
      console.log('はいった');
      setShowModal(false);
    }
  };

  if (!isShow) {
    return null;
  }

  return (
    <div
      id="modal"
      className="fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-black/20"
      onClick={hideModal}
    >
      <div id="modal-content">{children}</div>
    </div>
  );
};
