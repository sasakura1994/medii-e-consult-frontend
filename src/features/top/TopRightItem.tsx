import Label from '@/components/Parts/Label/Label';
import React from 'react';
import { TopClockHistory } from './TopClockHistory';

export const TopRightItem = () => {
  return (
    <div className="h-[201px] min-w-[232px] rounded-lg border border-[#EDEDED] shadow-high">
      <div className="p-4">
        <div className="flex items-center space-x-1">
          <p
            className="h-6 w-10 whitespace-nowrap rounded-full bg-medii-sky-base
           px-2 py-0.5 text-center text-medii-sm text-white"
          >
            新着
          </p>
          <TopClockHistory>
            <p className="ml-1 text-medii-sm text-text-primary">10分前に質問</p>
          </TopClockHistory>
        </div>
        <div className="mt-2 h-[107px]">
          <p className="text-l font-bold line-clamp-4">
            急性発症の全身の筋肉痛と蕁麻疹が主訴で異型リンパ球出現の女性の鑑別診断
          </p>
        </div>

        <div className="w-28">
          <Label text="ICU/集中治療科" color="gray" className="font-bold" />
        </div>
      </div>
    </div>
  );
};
