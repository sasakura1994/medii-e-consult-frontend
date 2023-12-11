/* eslint-disable react/display-name */
import React from 'react';

export type PropsType = {
  name: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string | JSX.Element;
  required?: boolean;
  subscript?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, PropsType>((props: PropsType, ref) => {
  const { name, value, placeholder, disabled, id, className, style, required, subscript, onChange, onBlur } = props;

  const textAreaClassName = React.useMemo(() => {
    let customClassName =
      'border border-solid border-border-field rounded px-2 py-[6px] font-[monospace] text-[15px] leading-[1.4]' +
      ' disabled:bg-[#d5d5d5] disabled:text-block-gray w-full';
    if (className) customClassName = `${customClassName} ${className}`;
    return customClassName;
  }, [className]);

  return (
    <div className="w-full">
      <div className="flex items-end">
        <textarea
          ref={ref}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          id={id}
          className={textAreaClassName}
          style={style}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          required={required}
        />
        {subscript && <span className="ml-2">{subscript}</span>}
      </div>
    </div>
  );
});
