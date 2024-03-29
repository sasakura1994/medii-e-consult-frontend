import React from 'react';
import styles from './Radio.module.scss';

type PropsType = {
  name: string;
  value?: string;
  checked?: boolean;
  id?: string;
  label?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
};

export const Radio: React.FC<PropsType> = (props) => {
  const { name, value, checked, id, label, onChange, required = false, disabled } = props;

  return (
    <label htmlFor={id} className={styles.radio}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        id={id}
        data-testid={id}
        className={`${styles.radio__input} ${styles.visually_hidden}`}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
      <span className={styles.radio__label} role="checkbox" aria-checked={checked}>
        {label}
      </span>
    </label>
  );
};
