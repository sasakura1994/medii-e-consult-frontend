import React from 'react';

type Props = {
  children?: string | JSX.Element;
  required?: boolean;
  id?: string;
};

export const EditProfileLabel = (props: Props) => {
  const { children, required, id } = props;

  if (!children) {
    return <></>;
  }

  return (
    <label htmlFor={id} className="mb-1 flex items-center font-bold">
      {required === true && (
        <span className="mr-1 rounded border border-solid border-rose-400 px-1 py-1 text-xs leading-none text-rose-400 w-11">
          必須
        </span>
      )}
      {required === false && (
        <span className="mr-1 rounded border border-solid border-primary px-1 py-1 text-xs leading-none text-primary w-11">
          任意
        </span>
      )}
      {children}
    </label>
  );
};
