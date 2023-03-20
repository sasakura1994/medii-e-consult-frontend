import React from 'react';
import styles from './Radio.module.scss';

type PropsType = {
  name: string;
  value?: string;
  checked?: boolean;
  id?: string;
  label?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: React.FC<PropsType> = (props) => {
  const { name, value, checked, id, label, onChange } = props;

  return (
    <div className={styles.radio}>
      <input
        type="radio"
        value={value}
        name={name}
        checked={checked}
        id={id}
        onChange={onChange}
        data-testid="radio-seminar-notify"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
