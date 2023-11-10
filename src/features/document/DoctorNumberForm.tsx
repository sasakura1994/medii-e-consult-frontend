import React from 'react';
import { DocumentSelected } from '.';
import { useDoctorNumberForm } from './useDoctorNumberForm';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { Required } from '@/components/Parts/Form/Required';
import TextField from '@/components/TextField/TextField';
import SecondaryButton from '@/components/Button/SecondaryButton';
import { dateFormat } from '@/libs/date';

type DoctorNumberFormProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({ setSelectedWithRedirect }) => {
  const {
    dateInputRef,
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
          <TextField
            type="text"
            placeholder="yyyy/mm/dd"
            onClick={() => dateInputRef.current?.showPicker()}
            // これを入れておかないとテスト時に文句を言われる
            onChange={() => {}}
            value={doctorLicenseDate ? dateFormat(doctorLicenseDate, 'YYYY/M/D') : ''}
            // 画像が表示されなくても支障なし
            // eslint-disable-next-line rulesdir/dont-use-url-properties
            className="bg-[url('/icons/arrow_down.svg')] bg-[center_right_20px] bg-no-repeat"
          />
          <input
            ref={dateInputRef}
            type="date"
            id="date-input"
            data-testid="date-input"
            value={doctorLicenseDate ? dateFormat(doctorLicenseDate, 'YYYY-MM-DD') : ''}
            onChange={(e) => parseAndSetDoctorLicenseDate(e.target.value)}
            className="invisible h-0 w-0"
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
