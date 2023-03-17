import React from 'react';
import styles from './Checkbox.module.scss';

type PropsType = {
  name: string;
  value?: string;
  checked?: boolean;
  id?: string;
  label?: string | JSX.Element;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// @todo material-iconsなどで装飾（classNameを現在外してある）
export const Checkbox: React.FC<PropsType> = (props) => {
  const { name, value, checked, id, label, onChange } = props;

  return (
    <div>
      <input
        type="checkbox"
        value={value}
        name={name}
        checked={checked}
        id={id}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};
