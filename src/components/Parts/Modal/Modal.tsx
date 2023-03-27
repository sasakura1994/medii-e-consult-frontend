import React from 'react';

type PropsType = {
  children: React.ReactNode;
  isShow: boolean;
  guard?: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal: React.FC<PropsType> = (props) => {
  const { children, isShow, guard, setShowModal } = props;

  const hideModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (guard) return;

    const targetElem = e.target as HTMLDivElement;

    if (targetElem.closest('[role="dialog"]') === null) {
      setShowModal(false);
    }
  };

  if (!isShow) {
    return null;
  }

  return (
    <div
      className="modal fixed top-0 left-0 flex h-screen w-screen flex-col items-center justify-center bg-black/20"
      onClick={hideModal}
    >
      <div className="modal-content" role="dialog">
        {children}
      </div>
    </div>
  );
};
