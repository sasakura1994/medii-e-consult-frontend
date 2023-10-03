import React, { forwardRef } from 'react';

export type PropsType = {
  name: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean;
  subscript?: string;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField = forwardRef<HTMLInputElement, PropsType>((props, ref) => {
  const {
    name,
    value,
    placeholder,
    disabled,
    id,
    ariaLabel,
    className,
    style,
    required,
    subscript,
    type = 'text',
    onChange,
    onBlur,
  } = props;

  const textFielClassName = React.useMemo(() => {
    let customClassName =
      'border border-solid border-block-gray rounded h-12 px-4 disabled:bg-[#d5d5d5] disabled:text-block-gray w-full';
    if (className) customClassName = `${customClassName} ${className}`;
    return customClassName;
  }, [className]);

  return (
    <div className="w-full">
      <div className="flex items-end">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          data-testid={id}
          aria-label={ariaLabel}
          className={textFielClassName}
          style={style}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
        />
        {subscript && <span className="ml-2">{subscript}</span>}
      </div>
    </div>
  );
});
