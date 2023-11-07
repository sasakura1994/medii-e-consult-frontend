import React from 'react';

type TextAreaProps = {
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  subText?: string;
  required?: boolean;
  dataTestId?: string;
  hasError?: boolean;
};

const TextArea = (props: TextAreaProps) => {
  const {
    label,
    name,
    disabled,
    className,
    placeholder,
    value,
    onChange,
    subText,
    required,
    dataTestId,
    hasError = false,
  } = props;
  return (
    <>
      <label className="text-md text-text-primary">{label}</label>
      <textarea
        name={name}
        disabled={disabled}
        className={`rounded-lg ${
          hasError
            ? 'border-2 border-alert focus:border-alert focus:outline-alert'
            : 'border border-border-field focus:border-border-selected'
        } px-3 py-2 text-md
        disabled:border-border-disabled disabled:bg-bg-secondary disabled:text-text-disabled
         ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid={dataTestId}
        required={required}
      />
      <p className="text-medii-sm text-text-secondary">{subText}</p>
    </>
  );
};

export default TextArea;
