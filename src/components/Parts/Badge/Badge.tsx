import React from 'react';

type PropsType = {
  children?: React.ReactNode;
  className?: string;
};

export const Badge: React.FC<PropsType> = (props) => {
  const { children, className } = props;

  return (
    <span
      className={`
        rounded-full
        bg-danger
        text-center
        text-white
        ${className}
      `}
    >
      {children}
    </span>
  );
};
