import React from 'react';

type DoctorNumberFormProps = {
  setSelected: React.Dispatch<React.SetStateAction<string>>;
};

const DoctorNumberForm: React.FC<DoctorNumberFormProps> = ({ setSelected }) => {
  const [doctorNumber, setDoctorNumber] = React.useState('');
  const [doctorLicenseYear, setDoctorLicenseYear] = React.useState('');
  const [doctorLicenseMonth, setDoctorLicenseMonth] = React.useState('');
  const [doctorLicenseDay, setDoctorLicenseDay] = React.useState('');
  return (
    <form>
      <div className="border-1 rounded-xs mt-10 -mb-10 w-full border bg-white lg:mb-0 lg:px-16 lg:pb-6">
        <div className="mt-6 mb-6">
          <div className="relative flex text-center text-2xl font-bold lg:mt-10">
            <div className="cursor-pointer">
              <img src="/icons/arrow_left.svg" className="mt-1.5 h-3 w-3" />
              <div
                className="absolute top-0 left-0 pl-4 text-base"
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
          <div className="mt-5 ml-5 text-center font-bold lg:mt-10 lg:ml-0 lg:text-left">
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
          <div className="mt-3 text-center font-bold lg:mt-3 lg:ml-0 lg:text-left">
            医師免許取得日(西暦)
          </div>
          <div className="mt-2 flex">
            <select
              required
              className="h-12 w-20 rounded-md border border-gray-400 px-2"
            >
              <option value="seireki">西暦</option>
              <option value="showa">昭和</option>
              <option value="heisei">平成</option>
              <option value="reiwa">令和</option>
            </select>
            <input
              type="number"
              placeholder="-"
              defaultValue={2019}
              value={doctorLicenseYear}
              className="ml-2 h-12 w-32 rounded-md border border-gray-400 px-2"
              required
              min={1900}
              max={5000}
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
              defaultValue={4}
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
              defaultValue={1}
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
      <div className="flex justify-center">
        <input
          type="submit"
          className="my-10 cursor-pointer rounded-full bg-btn-gray px-10 pt-1.5 pb-2 font-bold text-white shadow-lg"
          value="登録を完了する"
        />
      </div>
    </form>
  );
};

export default DoctorNumberForm;
