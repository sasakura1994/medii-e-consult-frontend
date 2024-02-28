import React, { useMemo } from 'react';
import { DocumentSelected } from '.';
import { useDoctorNumberForm } from './useDoctorNumberForm';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Required } from '@/components/Parts/Form/Required';
import TextField from '@/components/TextField/TextField';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { DateField } from '@/components/Form/DateField';
import { Heading } from '@/components/Parts/Text/Heading';
import { useProfile } from '@/hooks/useProfile';

type DoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const REGEX_NUMBER = /^[0-9]*$/g;

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({ setSelectedWithRedirect }) => {
  const { doctorNumber, setDoctorNumber, errorMessage, isUpdatePrepared, submit, parseAndSetDoctorLicenseDate } =
    useDoctorNumberForm({ setSelectedWithRedirect });

  const { profile } = useProfile();
  const LicencedDate = useMemo(() => {
    if (!profile) {
      return undefined;
    }
    return new Date(
      Number(profile.doctor_qualified_year),
      Number(profile.doctor_qualified_month) - 1,
      Number(profile.doctor_qualified_day)
    );
  }, [profile]);

  if (!profile) {
    return <></>;
  }

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
        <Heading as="h2">医師番号を入力</Heading>
        <div className="mt-2">医師番号と医師免許の取得年月日を入力してください。</div>
        <div className="mt-8 flex items-center gap-2">
          <div className="font-bold">医籍番号（6桁の数字）</div>
          <Required>必須</Required>
        </div>
        <TextField
          type="tel"
          placeholder="000000"
          className="mt-2 w-32 px-2"
          dataTestId="document-input-number-form"
          value={doctorNumber}
          required
          minLength={6}
          maxLength={6}
          onChange={(e) => {
            const value = e.target.value;
            if (value.match(REGEX_NUMBER) && value.length <= 6) {
              setDoctorNumber(value);
              return true;
            } else {
              return false;
            }
          }}
        />
        <div className="mt-8 flex items-center gap-2">
          <div className="font-bold">医師免許取得日</div>
          <Required>必須</Required>
        </div>
        <div className="mt-2">
          <DateField value={LicencedDate} onChange={(fullDate: string) => parseAndSetDoctorLicenseDate(fullDate)} />
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
