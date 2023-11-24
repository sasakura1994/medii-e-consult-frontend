import React, { FocusEventHandler } from 'react';
import styles from './SelectBox.module.scss';

type PropsType = {
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean;
  children: React.ReactNode;
  hasError?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: FocusEventHandler<HTMLSelectElement>;
};

export const SelectBox: React.FC<PropsType> = (props) => {
  const { name, value, disabled, id, className, style, required, children, hasError = false, onChange, onBlur } = props;

  return (
    <div className={styles.select_box}>
      {/* @todo マークを消せるようにしたいがstyled componentにするタイミングで */}
      <select
        name={name}
        value={value}
        disabled={disabled}
        id={id}
        className={`
          h-10
          w-full
          appearance-none
          rounded
          
          bg-white
          py-2
          pl-3
          pr-8
          disabled:bg-[#d5d5d5]
          disabled:text-block-gray
          ${
            hasError
              ? 'border-2 border-alert focus:border-alert focus:outline-alert'
              : 'border border-solid border-border-field'
          }
          ${className}
        `}
        style={style}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
      >
        {children}
      </select>
    </div>
  );
};
