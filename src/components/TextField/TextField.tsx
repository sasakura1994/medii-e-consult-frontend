import React, { ChangeEvent, MouseEventHandler } from 'react';

type TextFieldProps = {
  type?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: MouseEventHandler<HTMLInputElement>;
  subText?: string;
  required?: boolean;
  dataTestId?: string;
  minLength?: number;
  maxLength?: number;
  hasError?: boolean;
};

const TextField = (props: TextFieldProps) => {
  const {
    type,
    label,
    name,
    disabled,
    className,
    placeholder,
    value,
    onChange,
    onClick,
    subText,
    required,
    dataTestId,
    minLength,
    maxLength,
    hasError = false,
  } = props;
  return (
    <>
      <label className="text-md text-text-primary">{label}</label>
      <input
        type={type}
        name={name}
        disabled={disabled}
        className={`rounded-lg ${
          hasError
            ? 'border-2 border-alert focus:border-alert focus:outline-alert'
            : 'border border-border-field focus:border-border-selected'
        } px-3 py-2 text-md  ${className}`}
        value={value}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        data-testid={dataTestId}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
      ></input>
      <p className="text-medii-sm text-text-secondary">{subText}</p>
    </>
  );
};

export default TextField;
