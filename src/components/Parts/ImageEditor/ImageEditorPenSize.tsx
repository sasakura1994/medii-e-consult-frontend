import React from 'react';

type Props = {
  selected?: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

export const ImageEditorPenSize: React.FC<Props> = ({ children, selected = false, onClick }: Props) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div
        className={`
        h-10
        w-10
        rounded-full
        text-center
        leading-10
        ${selected ? 'bg-strong' : 'bg-block-gray'}
      `}
      >
        {children}
      </div>
    </a>
  );
};
