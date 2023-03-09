import React from 'react';
import { Label } from './Label';

type PropsType = {
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

export const SelectBox: React.FC<PropsType> = (props) => {
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
  } = props;

  const selectBoxClassName = React.useMemo(() => {
    let customClassName =
      'border border-solid border-[#999] rounded h-12 px-4 disabled:bg-[#d5d5d5] disabled:text-[#999] w-full';
    if (className) customClassName = `${customClassName} ${className}`;
    return customClassName;
  }, [className]);

  return (
    <div className="w-full">
      <Label label={label} required={required} id={id} />

      <div className="flex items-end">
        <div>
          <select name={name} id={id}></select>
        </div>
        {subscript && <span className="ml-2">{subscript}</span>}
      </div>
    </div>
  );
};
