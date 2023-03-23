import React from 'react';
import styles from './CheckBox.module.scss';

type PropsType = {
  name: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  id?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CheckBox: React.FC<PropsType> = (props) => {
  const { name, value, checked, defaultChecked, id, label, onChange } = props;

  return (
    <label htmlFor={id} className={styles.check_box}>
      <input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        defaultChecked={defaultChecked}
        id={id}
        className={`${styles.check_box__input} ${styles.visually_hidden}`}
        onChange={onChange}
      />
      <span
        className={styles.check_box__label}
        role="checkbox"
        aria-checked={defaultChecked}
      >
        {label}
      </span>
    </label>
  );
};
