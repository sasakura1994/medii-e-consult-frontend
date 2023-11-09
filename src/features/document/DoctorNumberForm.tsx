import React from 'react';
import { DocumentSelected } from '.';
import { useDoctorNumberForm } from './useDoctorNumberForm';
import { YearInput } from '@/components/Parts/Form/YearInput';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Required } from '@/components/Parts/Form/Required';
import TextField from '@/components/TextField/TextField';
import SecondaryButton from '@/components/Button/SecondaryButton';

type DoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({ setSelectedWithRedirect }) => {
  const {
    eraConverter,
    doctorNumber,
    setDoctorNumber,
    errorMessage,
    isUpdatePrepared,
    submit,
    doctorLicenseMonth,
    setDoctorLicenseMonth,
    doctorLicenseDay,
    setDoctorLicenseDay,
    year,
    setYear,
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
      <div className="mt-8 px-4 lg:w-[600px] lg:px-0">
        <div className="text-xl font-semibold">医師番号を入力</div>
        <div className="mt-2">医師番号と医師免許の取得年月日を入力してください。</div>
        <div className="mt-8 flex items-center">
          <div className="font-semibold">医籍番号（6桁の数字）</div>
          <Required>必須</Required>
        </div>

        <TextField
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
        <div className="mt-6 font-semibold">医師免許取得日</div>
        <div className="mt-2 flex">
          <YearInput {...eraConverter} value={year} onChange={setYear} />
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
      {errorMessage && <div className="mt-5 text-center text-base font-bold text-red-500">{errorMessage}</div>}
      <div className="mt-8 flex justify-center gap-2">
        <SecondaryButton onClick={() => setSelectedWithRedirect('')} size="large">
          選択へ戻る
        </SecondaryButton>
        <PrimaryButton
          type="submit"
          dataTestId="document-input-number-form-submit"
          size="large"
          disabled={!isUpdatePrepared}
        >
          登録を完了する
        </PrimaryButton>
      </div>
    </form>
  );
};

export default DoctorNumberForm;
