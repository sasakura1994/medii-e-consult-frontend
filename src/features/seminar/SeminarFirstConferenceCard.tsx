import PrimaryButton from '@/components/Button/Primary';
import SecondaryButton from '@/components/Button/Secondary';
import Tertiary from '@/components/Button/Tertiary';
import React, { useState } from 'react';
export const SeminarFirstConferenceCard = () => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="mt-6 flex h-full w-[928px] rounded-lg bg-white shadow-high">
      <img alt="" className="m-4 h-60 w-[440px]" />
      <div className="m-4 ml-0 h-auto w-[440px]">
        <PrimaryButton>
          <p className="text-medii-sm">Zoom E-カンファに事前登録</p>
        </PrimaryButton>
        <div className="mt-1 flex items-center">
          <p className="text-md">yyyy/mm/dd hh:mm</p>
          <div className="ml-5">
            <SecondaryButton>
              <div className="mr-1 h-4 w-4 bg-[#D9D9D9]" />
              <p>カレンダーに登録</p>
            </SecondaryButton>
          </div>
        </div>
        <p className="mt-3 text-md font-bold">セミナー概要</p>
        <p
          className={
            !isOpened
              ? 'mt-1 text-ellipsis text-md line-clamp-3'
              : 'mt-1 text-md'
          }
        >
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
        </p>
        <div className="mt-2 flex justify-center">
          <Tertiary
            size="medium"
            onClick={() => {
              setIsOpened((prev) => !prev);
            }}
          >
            <p className="text-medii-sm font-bold">
              {isOpened ? '閉じる' : 'もっと読む'}
            </p>
          </Tertiary>
        </div>
      </div>
    </div>
  );
};
