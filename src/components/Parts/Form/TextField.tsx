import React from 'react';
import { Label } from './Label';

export type PropsType = {
  name: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  required?: boolean;
  subscript?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export const TextField: React.FC<PropsType> = (props) => {
  const {
    name,
    value,
    placeholder,
    disabled,
    id,
    className,
    style,
    label,
    required,
    subscript,
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
      <Label label={label} required={required} id={id} />

      <div className="flex items-end">
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          className={textFielClassName}
          style={style}
          onChange={onChange}
          onBlur={onBlur}
        />
        {subscript && <span className="ml-2">{subscript}</span>}
      </div>
    </div>
  );
};
