import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import TextField from '../TextField/TextField';
import { dateFormat, dayjsDate } from '@/libs/date';
import { useRouter } from 'next/router';
import { ja } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { Modal } from '../Parts/Modal/Modal';

type Props = {
  id?: string;
  value?: Date | string | null;
  dataTestId?: string;
  disabled?: boolean;
  fromYear?: number;
  toYear?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const DateField = (props: Props) => {
  const router = useRouter();
  const {
    id,
    dataTestId,
    disabled = false,
    fromYear = new Date().getFullYear() - 100,
    toYear = new Date().getFullYear() + 1,
    value,
    onChange,
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isSafari, setIsSafari] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [birthday, setBirthday] = useState<string>('');
  const selectedDate = value ? dayjsDate(value as string) : undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setBirthday(value);
    if (
      Number(value.split('-')[0]) >= 1000 &&
      (dateFormat(value, 'YYYY') < fromYear.toString() ||
        dateFormat(value, 'YYYY') > new Date().getFullYear().toString())
    ) {
      setBirthday(dateFormat(value, 'YYYY'));
    }
  };

  useEffect(() => {
    if (value) {
      setBirthday(dateFormat(value, 'YYYY/MM/DD'));
    }
  }, [value]);

  useEffect(() => {
    if (isSafari || !router.isReady || typeof navigator === 'undefined') {
      return;
    }
    setIsSafari(router.isReady ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false);
  }, [isSafari, router.isReady]);

  return (
    <>
      <TextField
        type="date"
        placeholder="yyyy/mm/dd"
        onClick={() => {
          if (isSafari) {
            ref.current?.focus();
            setIsModalShown(true);
            return;
          }
        }}
        // これを入れておかないとテスト時に文句を言われる
        onChange={handleChange}
        value={birthday}
        // 画像が表示されなくても支障なし
        // eslint-disable-next-line rulesdir/dont-use-url-properties
        className="bg-[url('/icons/caret-down-fill.svg')] bg-[center_right_12px] bg-no-repeat"
        // iOSで操作するとフォーカスしたカーソルが残ってしまうため
        disabled={disabled || isModalShown}
      />
      {!disabled && (
        <input
          type="date"
          id={id}
          data-testid={dataTestId}
          defaultValue={birthday}
          onChange={handleChange}
          className="invisible h-0 w-0"
        />
      )}
      {isModalShown && (
        <Modal setShowModal={setIsModalShown} pcWidth="auto" className="" isCenter>
          <DayPicker
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={fromYear}
            toYear={toYear}
            defaultMonth={selectedDate}
            selected={selectedDate}
            onSelect={(day: Date | null | undefined) => {
              if (day) {
                onChange?.({
                  target: { value: dateFormat(day, 'YYYY-MM-DD') },
                } as unknown as ChangeEvent<HTMLInputElement>);
                setIsModalShown(false);
              }
            }}
            locale={ja}
            weekStartsOn={1}
          />
        </Modal>
      )}
    </>
  );
};
