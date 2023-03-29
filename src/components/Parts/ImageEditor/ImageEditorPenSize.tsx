import React from 'react';

type Props = {
  selected?: boolean;
  children: React.ReactNode;
};

export const ImageEditorPenSize: React.FC<Props> = ({
  children,
  selected = false,
}: Props) => {
  return (
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
  );
};
