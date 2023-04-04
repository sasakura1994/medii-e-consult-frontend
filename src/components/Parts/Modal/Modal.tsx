import React from 'react';

export type ModalPropsType = {
  children: React.ReactNode;
  guard?: boolean;
  width?: number;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<ModalPropsType> = (props) => {
  const { children, guard, setShowModal, width } = props;

  const hideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (guard) return;

    const targetElem = e.target as HTMLDivElement;

    if (targetElem.closest('[role="dialog"]') === null) {
      setShowModal(false);
    }
  };
  return (
    <div
      className="modal fixed top-0 left-0 z-[200] flex h-screen w-screen flex-col items-center justify-center bg-black/20"
      onClick={hideModal}
    >
      <div
        className="rounded border border-[#d5d5d5] bg-white"
        role="dialog"
        style={{ width: `${width}px` }}
      >
        {children}
      </div>
    </div>
  );
};
