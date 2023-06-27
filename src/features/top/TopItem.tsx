import Label from '@/components/Parts/Label/Label';
import React from 'react';
import { TopClockHistory } from './TopClockHistory';

export const TopItem = () => {
  return (
    <div className="h-[191px] min-w-[330px] rounded-lg border border-[#EDEDED] bg-bg-secondary shadow-low">
      <div className="p-4">
        <div className="w-28">
          <Label text="ICU/集中治療科" color="gray" />
        </div>
        <p className="mt-2 text-md text-text-secondary">異型リンパ球</p>
        <div className="mt-2 h-[71px]">
          <p className="text-l font-bold line-clamp-2">
            Streptpcoccsuagalaciae菌血症・僧帽弁自然弁感染性心内膜の弁破壊進行時の抗菌薬加療期間について
          </p>
        </div>
        <TopClockHistory />
      </div>
    </div>
  );
};
