import React from 'react';

type PropsType = {
  label?: string;
  required?: boolean;
  id?: string;
};

export const Label: React.FC<PropsType> = (props) => {
  const { label, required, id } = props;

  if (!label) {
    return null;
  }

  return (
    <label htmlFor={id} className="mb-1 flex items-center font-bold">
      {required === true && (
        <span className="mr-1 rounded border border-solid border-rose-400 px-1 py-1 text-xs leading-none text-rose-400">
          必須
        </span>
      )}
      {required === false && (
        <span className="mr-1 rounded border border-solid border-primary px-1 py-1 text-xs leading-none text-primary">
          任意
        </span>
      )}
      {label}
    </label>
  );
};
