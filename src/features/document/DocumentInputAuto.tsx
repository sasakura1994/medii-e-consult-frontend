import React from 'react';

import { useDocumentInputAuto } from './useDocumentInputAuto';
import { DocumentSelected } from '.';
import { YearInput } from '@/components/Parts/Form/YearInput';

type DocumentInputAutoProps = {
  setSelectedWithRedirect: (value: DocumentSelected) => void;
};

const DocumentInputAuto: React.FC<DocumentInputAutoProps> = ({ setSelectedWithRedirect }) => {
  const { errorMessage, eraConverter, submit, getPrefectureNameByCode, hospital, profile, setTel, tel, year, setYear } =
    useDocumentInputAuto({ setSelectedWithRedirect });
  return (
    <form
      onSubmit={(e) => {
        submit();
        e.preventDefault();
      }}
      data-testid="document-input-auto"
    >
      <div
        className="border-1 rounded-xs -mb-10 mt-5 w-full border bg-white
       px-6 pb-10 pt-4 lg:mb-0 lg:mt-10 lg:px-20"
      >
        <div className="relative mt-7 flex text-left text-2xl font-bold lg:mt-7 lg:text-center">
          <div className="hidden cursor-pointer lg:block">
            <img src="icons/arrow_left.svg" className="mt-1.5 h-3 w-3" alt="arrow_left" />
            <div
              className="absolute left-0 top-0 pl-4 text-base"
              onClick={() => {
                setSelectedWithRedirect('');
              }}
            >
              選択へ戻る
            </div>
          </div>
          <div className="mx-auto mb-10">Mediiにおまかせ</div>
        </div>
        <div className="lg:text-center">入力された情報を元にMediiが医師資格確認を行います。</div>
        <div className="mt-1 lg:text-center">
          上記確認作業で医師資格をご確認できなかった場合は、Mediiから勤務先に在籍確認のご連絡を差し上げる場合がございます。
        </div>
        <div className="flex justify-center">
          <div className="mt-2 text-left text-sm">※できる限りご本人に転送されるように致します。</div>
        </div>
        <div className="mt-10 text-center  font-bold lg:text-left">ご連絡先</div>
        <div className="mt-6 text-left font-bold">勤務先病院名</div>
        <div className="text-left">{hospital?.hospital_name ?? profile?.hospital_name}</div>
        <div className="mt-4 text-left font-bold">勤務先病院の所在地</div>
        <div className="text-left">{getPrefectureNameByCode(profile?.prefecture_code)}</div>
        <div className="mt-6 flex ">
          <div className="mr-1 rounded-md border border-primary px-1 py-0.5 text-xs font-bold text-primary">任意</div>
          <div className="text-left font-bold">勤務先電話番号</div>
        </div>
        <div className="mt-3">
          <input
            value={tel}
            className="h-12 w-full rounded-md border border-gray-400 px-2"
            onChange={(e) => {
              setTel(e.target.value);
            }}
            type="tel"
            pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
            placeholder="連絡可能な電話番号を入力してください"
          />
        </div>
        <div className="mt-6 flex text-left">
          <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">必須</div>
          <div className="text-left font-bold">医師免許取得年</div>
        </div>
        <div className="mt-2 text-left text-sm text-gray-500">（例）西暦：2022年 和暦：令和4年</div>
        <div className="mt-1">
          <YearInput {...eraConverter} value={year} onChange={setYear} />
        </div>
      </div>
      {errorMessage && <div className="mt-5 text-center text-base font-bold text-red-400">{errorMessage}</div>}
      <div className="-mb-20 mt-7 flex justify-center lg:mb-0 lg:mt-0">
        <input
          type="submit"
          className={
            year
              ? ' my-10 cursor-pointer rounded-full bg-primary px-10 pb-2 pt-1.5 font-bold text-white shadow-lg'
              : ' my-10 cursor-pointer rounded-full bg-btn-gray px-10 pb-2 pt-1.5 font-bold text-white shadow-lg'
          }
          value="登録を完了する"
        />
      </div>
    </form>
  );
};

export default DocumentInputAuto;
