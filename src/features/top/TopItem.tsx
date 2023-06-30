import Label from '@/components/Parts/Label/Label';
import React from 'react';
import { TopClockHistory } from './TopClockHistory';

export const TopItem = () => {
  return (
    <div className="h-[191px] min-w-[330px] rounded-lg border border-[#EDEDED] bg-bg-secondary shadow-low lg:w-1/3">
      <div className="p-4">
        <div className="w-28">
          <Label text="ICU/集中治療科" color="gray" />
        </div>
        <p className="mt-2 text-md text-text-secondary">異型リンパ球</p>
        <div className="mt-2 h-[71px]">
          <p className="text-l font-bold line-clamp-2">
            急性発症の全身の筋肉痛と蕁麻疹が主訴で異型リンパ球出現の女性の鑑別診断
          </p>
        </div>
        <TopClockHistory>
          <p className="ml-1 text-medii-sm text-text-primary">
            初回回答まで
            <span className="text-sm font-bold text-text-link">1時間14分</span>
            （2時間前に質問）
          </p>
        </TopClockHistory>
      </div>
    </div>
  );
};
