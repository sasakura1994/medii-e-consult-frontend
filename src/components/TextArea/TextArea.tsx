import React, { ReactNode, useEffect, useRef } from 'react';

type TextAreaProps = {
  labelText?: string;
  labelBadge?: ReactNode;
  disabled?: boolean;
  className?: string;
  name?: string;
  id: string;
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
    labelText,
    labelBadge,
    name,
    id,
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
  const textArea = useRef<HTMLTextAreaElement>(null);

  // textareaの高さを自動調整する
  useEffect(() => {
    if (textArea.current) {
      //textareaの高さを再設定
      textArea.current.style.height = 'auto';
      //textareaの高さに入力内容の高さを設定
      textArea.current.style.height = textArea.current.scrollHeight + 'px';
    }
  }, [value]);

  return (
    <>
      <label htmlFor={id} className="mb-2 flex items-center gap-x-2">
        <p className="text-base font-semibold text-text-primary">{labelText}</p>
        {labelBadge}
      </label>
      <textarea
        ref={textArea}
        id={id}
        name={name}
        disabled={disabled}
        className={`rounded-lg ${
          hasError
            ? 'border-2 border-alert focus:border-alert focus:outline-alert'
            : 'border border-border-field focus:border-border-selected'
        } w-full overflow-hidden px-3 py-2 text-md
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
