import { useFetchProfile } from '@/hooks/api/doctor/useFetchProfile';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useUploadDocument } from '@/hooks/api/doctor/useUploadDocument';
type DoctorNumberFormProps = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({ setSelected }) => {
  const { profile } = useFetchProfile();
  const { uploadDocument, isSuccess } = useUploadDocument();
  const [doctorNumber, setDoctorNumber] = useState('');
  const [doctorLicenseYear, setDoctorLicenseYear] = useState('');
  const [doctorLicenseMonth, setDoctorLicenseMonth] = useState('');
  const [doctorLicenseDay, setDoctorLicenseDay] = useState('');
  const [era, setEra] = useState('year');
  const [yearValidation, setYearValidation] = useState({
    min: 1900,
    max: 9999,
  });

  const isUpdatePrepared = useMemo(() => {
    if (
      doctorNumber &&
      doctorLicenseYear &&
      doctorLicenseMonth &&
      doctorLicenseDay
    ) {
      return true;
    }
    return false;
  }, [doctorNumber, doctorLicenseYear, doctorLicenseMonth, doctorLicenseDay]);

  const convertToYear = (year: string) => {
    switch (era) {
      case 'year':
        setYearValidation({ min: 1900, max: 9999 });
        return year;
      case 'showa': {
        setYearValidation({ min: 1, max: 64 });
        const showaYear = parseInt(year, 10) + 1925;
        return String(showaYear);
      }
      case 'heisei': {
        setYearValidation({ min: 1, max: 31 });
        const heiseiYear = parseInt(year, 10) + 1988;
        return String(heiseiYear);
      }
      case 'reiwa': {
        setYearValidation({ min: 1, max: 99 });
        const reiwaYear = parseInt(year, 10) + 2018;
        return String(reiwaYear);
      }
      default: {
        setYearValidation({ min: 1900, max: 9999 });
        return year;
      }
    }
  };

  // 西暦・和暦が切り替えられる度にバリデーションも分ける
  useEffect(() => {
    convertToYear(doctorLicenseYear);
  }, [era]);

  useEffect(() => {
    if (profile) {
      setDoctorNumber(profile.doctor_number);
      setDoctorLicenseYear(profile.doctor_qualified_year.toString());
      setDoctorLicenseMonth(profile.doctor_qualified_month.toString());
      setDoctorLicenseDay(profile.doctor_qualified_day.toString());
    }
  }, [profile]);

  const submit = useCallback(() => {
    if (profile) {
      const year = convertToYear(doctorLicenseYear);
      const newProfile = Object.assign({}, profile);
      newProfile.doctor_number = doctorNumber;
      newProfile.doctor_qualified_year = Number(year);
      newProfile.doctor_qualified_month = Number(doctorLicenseMonth);
      newProfile.doctor_qualified_day = Number(doctorLicenseDay);
      uploadDocument(newProfile);
    }
  }, [
    doctorNumber,
    doctorLicenseYear,
    doctorLicenseMonth,
    doctorLicenseDay,
    profile,
  ]);

  useEffect(() => {
    if (isSuccess) {
      setSelected('completed');
    }
  }, [isSuccess]);

  return (
    <form
      onSubmit={(e) => {
        submit();
        e.preventDefault();
      }}
      className="w-full"
    >
      <div className="border-1 rounded-xs mt-10 -mb-10 w-full border bg-white lg:mb-0 lg:px-16 lg:pb-6">
        <div className="mx-2 mt-6 mb-6">
          <div className="relative flex text-left text-2xl font-bold lg:mt-10 lg:text-center">
            <div className="hidden cursor-pointer lg:block">
              <img src="/icons/arrow_left.svg" className="mt-1.5 h-3 w-3" />
              <div
                className="absolute top-0 left-0 pl-4 text-base "
                onClick={() => {
                  setSelected('');
                }}
              >
                選択へ戻る
              </div>
            </div>
            <div className="mx-auto">医師番号を入力</div>
          </div>
          <div className="mt-10 px-6  text-center lg:px-0">
            医師番号と医師免許の取得年月日を入力してください
          </div>
          <div className="mt-5 text-left font-bold  lg:mt-10">
            医籍番号 (6桁の数字)
          </div>
          <input
            type="text"
            placeholder="000000"
            className="mt-2 h-12 w-32 rounded-md border border-gray-400 px-2"
            value={doctorNumber}
            required
            minLength={6}
            maxLength={6}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 6) {
                setDoctorNumber(value);
              }
            }}
          />
          <div className="mt-3 text-left font-bold lg:mt-3 lg:ml-0">
            医師免許取得日(西暦)
          </div>
          <div className="mt-2 flex">
            <select
              required
              className="h-12 w-20 rounded-md border border-gray-400 px-2"
              onChange={(e) => {
                const value = e.target.value;
                setEra(value);
                if (value === 'year') {
                  const year = convertToYear(doctorLicenseYear);
                  setDoctorLicenseYear(year);
                } else {
                  setDoctorLicenseYear('');
                }
              }}
            >
              <option value="year">西暦</option>
              <option value="showa">昭和</option>
              <option value="heisei">平成</option>
              <option value="reiwa">令和</option>
            </select>
            <input
              type="number"
              placeholder="-"
              value={doctorLicenseYear}
              className="ml-2 h-12 w-32 rounded-md border border-gray-400 px-2"
              required
              min={yearValidation.min}
              max={yearValidation.max}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 4) {
                  setDoctorLicenseYear(value);
                }
              }}
            />
            <div className="ml-1 mt-5">年</div>
            <input
              type="number"
              value={doctorLicenseMonth}
              placeholder="-"
              className="ml-10 h-12 w-20 rounded-md border border-gray-400 px-2"
              required
              min={1}
              max={12}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 2) {
                  setDoctorLicenseMonth(value);
                }
              }}
            />
            <div className="ml-1 mt-5">月</div>
            <input
              type="number"
              value={doctorLicenseDay}
              placeholder="-"
              className="ml-2 h-12 w-20 rounded-md border border-gray-400 px-2"
              required
              min={1}
              max={31}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 2) {
                  setDoctorLicenseDay(value);
                }
              }}
            />
            <div className="ml-1 mt-5">日</div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex justify-center lg:mt-0">
        <input
          type="submit"
          className={
            isUpdatePrepared
              ? ' my-10 cursor-pointer rounded-full bg-primary px-10 pt-1.5 pb-2 font-bold text-white shadow-lg'
              : ' my-10 cursor-pointer rounded-full bg-btn-gray px-10 pt-1.5 pb-2 font-bold text-white shadow-lg'
          }
          value="登録を完了する"
        />
      </div>
    </form>
  );
};

export default DoctorNumberForm;
