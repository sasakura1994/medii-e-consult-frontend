import React from 'react';
export const ConsultTitle = () => {
  return (
    <div className="h-16 cursor-pointer border-b border-[#d5d5d5] hover:bg-primary-light active:bg-primary-light">
      <div className="flex">
        <p className="mt-2 ml-9 flex-grow text-l font-bold">20代 男性 テスト</p>
        <p className="mt-3 mr-3 text-xs">6/19 8:22</p>
      </div>
      <p className="ml-9 text-[#999999]">test</p>
    </div>
  );
};
