import React from 'react';
import { Era } from '../../hooks/useEraConverter';
import { DocumentSelected } from '.';
import { useDoctorNumberForm } from './useDoctorNumberForm';

type DoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({
  setSelectedWithRedirect,
}) => {
  const {
    doctorNumber,
    setDoctorNumber,
    errorMessage,
    isUpdatePrepared,
    submit,
    validation,
    handleEraChange,
    inputYear,
    doctorLicenseMonth,
    setDoctorLicenseMonth,
    doctorLicenseDay,
    setDoctorLicenseDay,
    handleInputYearToSeireki,
    handleDoctorLicenseYearToJapaneseEraYear,
  } = useDoctorNumberForm({ setSelectedWithRedirect });

  return (
    <form
      onSubmit={(e) => {
        submit();
        e.preventDefault();
      }}
      className="w-full"
      data-testid="document-input-number"
    >
      <div className="border-1 rounded-xs mt-10 w-full border bg-white lg:px-16  lg:pb-6">
        <div className="mx-2 mt-6 mb-6">
          <div className="relative flex text-left text-2xl font-bold lg:mt-10 lg:text-center">
            <div className="hidden cursor-pointer lg:block">
              <img
                src="/icons/arrow_left.svg"
                className="mt-1.5 h-3 w-3"
                alt="arrow_left"
              />
              <div
                className="absolute top-0 left-0 pl-4 text-base "
                onClick={() => {
                  setSelectedWithRedirect('');
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
            data-testid="document-input-number-form"
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
                handleEraChange(e.target.value);
                handleDoctorLicenseYearToJapaneseEraYear(e.target.value as Era);
              }}
            >
              <option value="year">西暦</option>
              <option value="showa">昭和</option>
              <option value="heisei">平成</option>
              <option value="reiwa">令和</option>
            </select>
            <input
              type="number"
              data-testid="document-input-number-form-year"
              placeholder="-"
              value={inputYear}
              className="ml-2 h-12 w-32 rounded-md border border-gray-400 px-2"
              required
              min={validation.min}
              max={validation.max}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 4) {
                  handleInputYearToSeireki(value);
                }
              }}
            />
            <div className="ml-1 mt-5">年</div>
            <input
              type="number"
              data-testid="document-input-number-form-month"
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
              data-testid="document-input-number-form-day"
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
      {errorMessage && (
        <div className="mt-5 text-center text-base font-bold text-red-500">
          {errorMessage}
        </div>
      )}
      <div className="mt-7 -mb-10 flex justify-center lg:mt-0 lg:mb-0">
        <input
          type="submit"
          data-testid="document-input-number-form-submit"
          className={
            isUpdatePrepared
              ? 'cursor-pointer rounded-full bg-primary px-10 pt-1.5 pb-2 font-bold text-white shadow-lg lg:my-10'
              : 'cursor-pointer rounded-full bg-btn-gray px-10 pt-1.5 pb-2 font-bold text-white shadow-lg lg:my-10'
          }
          value="登録を完了する"
        />
      </div>
    </form>
  );
};

export default DoctorNumberForm;
