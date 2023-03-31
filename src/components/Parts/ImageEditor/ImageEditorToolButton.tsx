import React from 'react';

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  src: string;
};

export const ImageEditorToolButton: React.FC<Props> = ({
  onClick,
  isDisabled = false,
  src,
}: Props) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <img src={src} className={isDisabled ? 'opacity-40' : ''} />
    </a>
  );
};
