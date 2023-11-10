import { Era, UseEraConverter } from '@/hooks/useEraConverter';
import React from 'react';
import { SelectBox } from './SelectBox';
import TextField from '@/components/TextField/TextField';

type Props = UseEraConverter & {
  value: number;
  onChange: (value: number) => void;
};

export const YearInput = (props: Props) => {
  const { convertYear, era, setEra, onChange, validation, value } = props;

  return (
    <div className="flex">
      <div className="w-[104px]">
        <SelectBox
          required
          className="h-12 w-20 rounded-md border border-gray-400 px-2"
          onChange={(e) => setEra(e.target.value as Era)}
        >
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
        className="ml-2 h-12 w-20 rounded-md border border-gray-400 px-2 lg:w-40"
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
        data-testid="year-input-year"
      />
      <div className="ml-1 mt-5">年</div>
    </div>
  );
};
