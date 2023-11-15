import React, { ChangeEventHandler, useRef } from 'react';
import TextField from '../TextField/TextField';
import { dateFormat } from '@/libs/date';

type Props = {
  id?: string;
  value?: Date | string | null;
  dataTestId?: string;
  disabled?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const DateField = (props: Props) => {
  const { id, dataTestId, disabled = false, value, onChange } = props;
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <TextField
        type="text"
        placeholder="yyyy/mm/dd"
        onClick={() => ref.current?.showPicker()}
        // これを入れておかないとテスト時に文句を言われる
        onChange={() => {}}
        value={value ? dateFormat(value, 'YYYY/M/D') : ''}
        // 画像が表示されなくても支障なし
        // eslint-disable-next-line rulesdir/dont-use-url-properties
        className="bg-[url('/icons/arrow_down.svg')] bg-[center_right_20px] bg-no-repeat"
        disabled={disabled}
      />
      {!disabled && (
        <input
          ref={ref}
          type="date"
          id={id}
          data-testid={dataTestId}
          value={value ? dateFormat(value, 'YYYY-MM-DD') : ''}
          onChange={onChange}
          className="invisible h-0 w-0"
        />
      )}
    </>
  );
};
