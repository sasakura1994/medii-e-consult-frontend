import React from 'react';

type PropsType = {
  name: string;
  value?: string;
  checked?: boolean;
  id: string;
  label?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
};

export const DefaultRadio = (props: PropsType) => {
  const { name, value, checked, id, label, onChange, required = false, className } = props;

  return (
    <div className={`flex ${className ?? ''}`}>
      <input
        type="radio"
        value={value}
        name={name}
        className="mr-2"
        checked={checked}
        id={id}
        data-testid={id}
        onChange={onChange}
        required={required}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
