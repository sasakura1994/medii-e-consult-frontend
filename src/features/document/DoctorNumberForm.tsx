import React from 'react';
import { DocumentSelected } from '.';
import { useDoctorNumberForm } from './useDoctorNumberForm';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Required } from '@/components/Parts/Form/Required';
import TextField from '@/components/TextField/TextField';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { DateField } from '@/components/Form/DateField';

type DoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({ setSelectedWithRedirect }) => {
  const {
    doctorNumber,
    setDoctorNumber,
    errorMessage,
    isUpdatePrepared,
    submit,
    doctorLicenseDate,
    parseAndSetDoctorLicenseDate,
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
        <div className="mt-8 flex items-center gap-2">
          <div className="font-semibold">医籍番号（6桁の数字）</div>
          <Required>必須</Required>
        </div>
        <TextField
          type="text"
          placeholder="000000"
          className="mt-2 w-32 px-2"
          dataTestId="document-input-number-form"
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
        <div className="mt-8 flex items-center gap-2">
          <div className="font-semibold">医師免許取得日</div>
          <Required>必須</Required>
        </div>
        <div className="mt-2">
          <DateField
            id="date-input"
            dataTestId="date-input"
            value={doctorLicenseDate}
            onChange={(e) => parseAndSetDoctorLicenseDate(e.target.value)}
          />
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
