import React from 'react';
import styles from './SelectBox.module.scss';

type PropsType = {
  name: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  required?: boolean;
  children: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectBox: React.FC<PropsType> = (props) => {
  const {
    name,
    value,
    disabled,
    id,
    className,
    style,
    required,
    children,
    onChange,
  } = props;

  return (
    <div className={styles.select_box}>
      {/* @todo マークを消せるようにしたいがstyled componentにするタイミングで */}
      <select
        name={name}
        value={value}
        disabled={disabled}
        id={id}
        className={`
          h-12
          w-full
          appearance-none
          rounded
          border
          border-solid
          border-block-gray
          bg-white
          py-2
          pr-8
          pl-3
          disabled:bg-[#d5d5d5]
          disabled:text-block-gray
          ${className}
        `}
        style={style}
        onChange={onChange}
        required={required}
      >
        {children}
      </select>
    </div>
  );
};
