import React from 'react';
import styles from './CheckBox.module.scss';

type PropsType = {
  name: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  label?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const CheckBox: React.FC<PropsType> = (props) => {
  const { name, value, checked, defaultChecked, id, label, onChange, required = false } = props;

  return (
    <label htmlFor={id} className={styles.check_box}>
      <input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        id={id}
        data-testid={id}
        className={`${styles.check_box__input} ${styles.visually_hidden}`}
        onChange={onChange}
        required={required}
      />
      <span className={styles.check_box__label} role="checkbox" aria-checked={defaultChecked}>
        {label}
      </span>
    </label>
  );
};
