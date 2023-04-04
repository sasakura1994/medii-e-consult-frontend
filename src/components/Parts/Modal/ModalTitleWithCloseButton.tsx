import React from 'react';

type Props = {
  title: string;
  onClose: () => void;
};

export const ModalTitleWithCloseButton: React.FC<Props> = ({
  title,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="shrink-0 grow text-2xl font-bold">{title}</div>
      <div className="grow-0">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <img
            src="/icons/close_primary.svg"
            width="18"
            height="18"
            alt="閉じる"
          />
        </a>
      </div>
    </div>
  );
};
