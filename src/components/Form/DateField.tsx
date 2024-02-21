import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import TextField from '../TextField/TextField';
import { dateFormat } from '@/libs/date';
import { useRouter } from 'next/router';
import { ErrorMessage } from '../Parts/Text/ErrorMessage';
import dayjs from 'dayjs';

type DateType = 'year' | 'month' | 'date';

type Props = {
  value?: Date | string | null;
  disabled?: boolean;
  onChange: (fullDate: string) => void;
};

export const DateField = (props: Props) => {
  const router = useRouter();
  const { disabled = false, value, onChange } = props;
  const ref = useRef<HTMLInputElement>(null);
  const [isSafari, setIsSafari] = useState(false);
  const [year, setYear] = useState<string>(dateFormat(value, 'YYYY'));
  const [month, setMonth] = useState<string>(dateFormat(value, 'MM'));
  const [date, setDate] = useState<string>(dateFormat(value, 'DD'));
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeDate = (e: ChangeEvent<HTMLInputElement>, dateType: DateType) => {
    e.preventDefault();
    switch (dateType) {
      case 'year':
        setYear(e.target.value);
        break;
      case 'month':
        setMonth(e.target.value);
        break;
      case 'date':
        setDate(e.target.value);
        break;
      default:
    }
  };

  const handleBlur = () => {
    const dateStr = `${year}-${month.padStart(2, '0')}-${date.padStart(2, '0')}`;
    if (dayjs(dateStr, 'YYYY-MM-DD', true).isValid()) {
      if (dayjs().isAfter(dayjs(dateStr))) {
        setErrorMessage('');
        onChange(dateStr);
      } else {
        setErrorMessage('入力された年月日が現在の日付を超えることはできません。');
      }
    } else {
      setErrorMessage('入力した日付が存在しません。');
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
          disabled={disabled}
        />
        <p className="mx-3 flex items-center">年</p>
        <TextField
          placeholder="06"
          type="text"
          onChange={(e) => {
            handleChangeDate(e, 'month');
          }}
          onBlur={handleBlur}
          value={month}
          className="w-20"
          disabled={disabled}
        />
        <p className="mx-3 flex items-center">月</p>
        <TextField
          placeholder="25"
          type="text"
          onChange={(e) => {
            handleChangeDate(e, 'date');
          }}
          onBlur={handleBlur}
          value={date}
          className="w-20"
          disabled={disabled}
        />
        <p className="mx-3 flex items-center">日</p>
      </div>
      {errorMessage && <ErrorMessage className="mt-4">{errorMessage}</ErrorMessage>}
    </>
  );
};
