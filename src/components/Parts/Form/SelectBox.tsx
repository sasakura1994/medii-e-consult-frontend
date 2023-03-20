import React from 'react';
import styles from './SelectBox.module.scss';
import { Label } from './Label';

export type OptionType = {
  id: number | string;
  value: number | string | undefined;
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    options,
    onChange,
  } = props;

  const selectBoxClassName = React.useMemo(() => {
    let customClassName = `flex items-end`;
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
            id={id}
            className="h-12 w-full appearance-none rounded border border-solid border-block-gray bg-white py-2 pr-8 pl-3 outline-none"
          >
            <option value="">都道府県</option>
            <option value="8">茨城県</option>
            <option value="9">栃木県</option>
            <option value="10">群馬県</option>
            <option value="11">埼玉県</option>
            <option value="12">千葉県</option>
            <option value="13">東京都</option>
            <option value="14">神奈川県</option>
          </select>
        </div>
        {subscript && <span className="ml-2">{subscript}</span>}
      </div>
    </div>
  );
};
