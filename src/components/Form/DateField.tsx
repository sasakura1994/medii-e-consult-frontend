import React, { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from 'react';
import TextField from '../TextField/TextField';
import { dateFormat, dayjsDate } from '@/libs/date';
import { useRouter } from 'next/router';
import { ja } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { Modal } from '../Parts/Modal/Modal';
import { ErrorMessage } from '../Parts/Text/ErrorMessage';
import dayjs from 'dayjs';

type DateType = 'year' | 'month' | 'day';

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
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [dateStr, setDateStr] = useState('');
  const selectedDate = value ? dayjsDate(value as string) : undefined;

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>, dateType: DateType) => {
    e.preventDefault();
    switch (dateType) {
      case 'year':
        setYear(e.target.value);
        setDateStr(`${e.target.value}-${month}-${date}`);
        break;
      case 'month':
        setMonth(e.target.value);
        setDateStr(`${year}-${e.target.value}-${date}`);
        break;
      case 'day':
        setDate(e.target.value);
        setDateStr(`${year}-${month}-${e.target.value}`);
        break;
      default:
    }
  };

  const handleBlur = () => {
    if (dayjs(dateStr, 'YYYY-MM-DD', true).isValid()) {
      if (dayjs().isAfter(dayjs(dateStr))) {
        setErrorMessage('');
      } else {
        setErrorMessage('エラーが発生しました。');
      }
    } else {
      setErrorMessage('エラーが発生しました。');
    }
  };

  useEffect(() => {
    if (isSafari || !router.isReady || typeof navigator === 'undefined') {
      return;
    }
    setIsSafari(router.isReady ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : false);
  }, [isSafari, router.isReady]);

  return (
    <>
      <div className="flex">
        <TextField
          type="text"
          placeholder="1990"
          onClick={() => {
            if (isSafari) {
              ref.current?.focus();
              setIsModalShown(true);
              return;
            }
          }}
          // これを入れておかないとテスト時に文句を言われる
          onChange={(e) => {
            handleChangeDate(e, 'year');
          }}
          onBlur={handleBlur}
          value={year}
          // 画像が表示されなくても支障なし
          // eslint-disable-next-line rulesdir/dont-use-url-properties
          className="w-20"
          // iOSで操作するとフォーカスしたカーソルが残ってしまうため
          disabled={disabled || isModalShown}
        />
        <p className="mx-3 flex items-center">年</p>
        <TextField
          placeholder="06"
          type="text"
          onChange={(e) => handleChangeDate(e, 'month')}
          onBlur={handleBlur}
          value={month}
          className="w-20"
        />
        <p className="mx-3 flex items-center">月</p>
        <TextField
          placeholder="25"
          type="text"
          onChange={(e) => {
            handleChangeDate(e, 'day');
          }}
          onBlur={handleBlur}
          value={date}
          className="w-20"
        />
        <p className="mx-3 flex items-center">日</p>
      </div>
      {errorMessage && <ErrorMessage className="mt-4">{errorMessage}</ErrorMessage>}
      {!disabled && (
        <input type="date" id={id} data-testid={dataTestId} defaultValue={year} className="invisible h-0 w-0" />
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
