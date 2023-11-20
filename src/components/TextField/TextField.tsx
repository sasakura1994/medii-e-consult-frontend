import React, { ChangeEvent, MouseEventHandler } from 'react';

type TextFieldProps = {
  id?: string;
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
  min?: number;
  max?: number;
  hasError?: boolean;
};

const TextField = (props: TextFieldProps) => {
  const {
    id,
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
    min,
    max,
    hasError = false,
  } = props;
  return (
    <>
      {label && <label className="text-md text-text-primary">{label}</label>}
      <input
        id={id}
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
        min={min}
        max={max}
        required={required}
      ></input>
      <p className="text-medii-sm text-text-secondary">{subText}</p>
    </>
  );
};

export default TextField;
