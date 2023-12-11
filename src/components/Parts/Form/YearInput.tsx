import { Era, UseEraConverter } from '@/hooks/useEraConverter';
import React, { FocusEventHandler } from 'react';
import { SelectBox } from './SelectBox';
import TextField from '@/components/TextField/TextField';

type Props = UseEraConverter & {
  value: number;
  onChange: (value: number) => void;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  hasError?: boolean;
};

export const YearInput = (props: Props) => {
  const { convertYear, era, hasError, setEra, onBlur, onChange, validation, value } = props;

  return (
    <div className="flex">
      <div className="w-[104px]">
        <SelectBox required className="w-20 px-2" onChange={(e) => setEra(e.target.value as Era)}>
          <option value="year">西暦</option>
          <option value="showa">昭和</option>
          <option value="heisei">平成</option>
          <option value="reiwa">令和</option>
        </SelectBox>
      </div>
      <TextField
        type="number"
        placeholder="yyyy"
        value={convertYear(value.toString(), 'year', era)}
        className="ml-2 h-10 w-20 px-2 lg:w-40"
        required
        min={validation.min}
        max={validation.max}
        onChange={(e) => {
          const value = e.target.value;
          if (value.length <= 4) {
            const year = convertYear(value, era, 'year');
            onChange(Number(year));
          }
        }}
        onBlur={onBlur}
        hasError={hasError}
        dataTestId="year-input-year"
      />
      <div className="ml-1 mt-4">年</div>
    </div>
  );
};
