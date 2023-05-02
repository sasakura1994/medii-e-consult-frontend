import React from 'react';

type DocumentInputAutoProps = {
  setSelected: React.Dispatch<
    React.SetStateAction<'' | 'number' | 'document' | 'auto' | 'completed'>
  >;
};

const DocumentInputAuto: React.FC<DocumentInputAutoProps> = ({
  setSelected,
}) => {
  return (
    <form>
      <div className="border-1 rounded-xs mt-10 w-full border bg-white px-6 pt-4 lg:mb-0 lg:px-24 lg:pt-4 lg:pb-6">
        <div className="relative mt-5 flex text-left text-2xl font-bold lg:mt-10 lg:text-center">
          <div className="hidden cursor-pointer lg:block">
            <img
              src="/icons/arrow_left.svg"
              className="mt-1.5 h-3 w-3"
              alt=""
            />
            <div
              className="absolute top-0 left-0 text-base"
              onClick={() => {
                setSelected('');
              }}
            >
              選択へ戻る
            </div>
          </div>

          <div className="mx-auto mb-10">Mediiにおまかせ</div>
        </div>
        <div className="lg:text-center">
          入力された情報を元にMediiが医師資格確認を行います。
        </div>
        <div className="mt-1 lg:text-center">
          上記確認作業で医師資格をご確認できなかった場合は、Mediiから勤務先に在籍確認のご連絡を差し上げる場合がございます。
        </div>
        <div className="flex justify-center">
          <div className="mt-2 text-left text-sm">
            ※できる限りご本人に転送されるように致します。
          </div>
        </div>
        <div className="mt-10 text-center  font-bold lg:text-left">
          ご連絡先
        </div>
        <div className="mt-6 text-left font-bold">勤務先病院名</div>
        <div className="text-left">{'大学'}</div>
        <div className="mt-4 text-left font-bold">勤務先病院の所在地</div>
        <div className="text-left">{'病院'}</div>
        <div className="mt-6 flex ">
          <div className="mr-1 rounded-md border border-primary px-1 py-0.5 text-xs font-bold text-primary">
            任意
          </div>
          <div className="text-left font-bold">勤務先電話番号</div>
        </div>
        <div className="mt-1">
          <input
            value={'000 - 0000 - 0000'}
            onChange={(e) => console.log('input', e.target.value)}
            type="tel"
            pattern="\d{2,4}-?\d{2,4}-?\d{3,4}"
            className="text-input w-full"
            placeholder="連絡可能な電話番号を入力してください"
          />
        </div>
        <div className="mt-6 flex text-left">
          <div className="mr-1 rounded-md border border-red-500 px-1 py-0.5 text-xs font-bold text-red-500">
            必須
          </div>
          <div className="text-left font-bold">医師免許取得年</div>
        </div>
        <div className="text-left text-sm text-gray-500">
          （例）西暦：2022年 和暦：令和4年
        </div>
        <div className="mt-1 w-4/6">
          <input
            value={1993}
            onChange={(e) => console.log('input', e.target.value)}
            type="tel"
            pattern="\d{4}"
            className="text-input w-full"
            placeholder="西暦または和暦で入力してください"
          />
        </div>
      </div>
    </form>
  );
};

export default DocumentInputAuto;
