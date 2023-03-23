import React from 'react';
import styles from './SelectBox.module.scss';
import { Label } from './Label';

export type OptionType = {
  id?: number | string;
  value?: number | string | undefined;
  name: string;
  checked?: boolean;
};

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
  options: OptionType[];
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
    label,
    required,
    subscript,
    options,
    onChange,
  } = props;

  const selectBoxClassName = React.useMemo(() => {
    let customClassName = 'flex items-end';
    if (className) customClassName = `${customClassName} ${className}`;
    return customClassName;
  }, [className]);

  return (
    <div className="w-full">
      <Label label={label} required={required} id={id} />

      <div className={selectBoxClassName}>
        <div className={styles.select_box}>
          <select
            name={name}
            value={value}
            disabled={disabled}
            id={id}
            className="h-12 w-full appearance-none rounded border border-solid border-block-gray bg-white py-2 pr-8 pl-3 disabled:bg-[#d5d5d5] disabled:text-block-gray"
            style={style}
            onChange={onChange}
          >
            {options.map((option) => (
              <option
                value={option.value}
                defaultChecked={option.checked}
                key={option.id}
              >
                {option.name}
              </option>
            ))}
          </select>
        </div>
        {subscript && <span className="ml-2">{subscript}</span>}
      </div>
    </div>
  );
};
