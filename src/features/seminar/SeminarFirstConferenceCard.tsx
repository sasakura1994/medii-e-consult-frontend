import PrimaryButton from '@/components/Button/Primary';
import SecondaryButton from '@/components/Button/Secondary';
import Tertiary from '@/components/Button/Tertiary';
import React from 'react';
export const SeminarFirstConferenceCard = () => {
  return (
    <div className="mt-6 flex h-full w-[928px] rounded-lg bg-white shadow-high">
      <img alt="" className="m-4 h-60 w-[440px]" />
      <div className="m-4 ml-0 h-60 w-[440px]">
        <PrimaryButton>
          <p className="text-medii-sm">Zoom E-カンファに事前登録</p>
        </PrimaryButton>
        <div className="mt-1 flex items-center">
          <p className="text-md">yyyy/mm/dd hh:mm</p>
          <div className="ml-5">
            <SecondaryButton>カレンダーに登録</SecondaryButton>
          </div>
        </div>
        <p className="mt-3 text-md font-bold">セミナー概要</p>
        <p className="mt-1 text-ellipsis text-md line-clamp-3">
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああああああああああああああああああああああああ
          あああああああああああああああああ
        </p>
        <div className="mt-2 flex justify-center">
          <Tertiary size="medium">
            <p className="text-medii-sm font-bold">もっと読む</p>
          </Tertiary>
        </div>
      </div>
    </div>
  );
};
