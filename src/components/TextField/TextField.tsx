import React from 'react';

type TextFieldProps = {
  label?: string;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  subText?: string;
  required?: boolean;
};

const TextField = (props: TextFieldProps) => {
  const { label, disabled, className, placeholder, value, onChange, subText, required } = props;
  return (
    <>
      <label className="text-md text-text-primary">{label}</label>
      <input
        disabled={disabled}
        className={`rounded-lg border border-border-field px-3 py-2 text-md focus:border-border-selected ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      ></input>
      <p className="text-medii-sm text-text-secondary">{subText}</p>
    </>
  );
};

export default TextField;
