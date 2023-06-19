import React from 'react';
import { ChatList } from './ChatList';

export const ConsultDetail = () => {
  return (
    <div className="h-screen w-[787px] border border-[#d5d5d5]">
      <div className="mr-2 flex h-14 items-center space-x-1">
        <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-strong">
          <p className="py-0.5 text-xs text-white">未解決</p>
        </div>
        <p className="ml-2 flex-grow font-bold">20代 男性 テスト</p>
        <button className="h-9 w-[78px] rounded-full bg-primary">
          <p className="text-xs text-white">返答依頼</p>
        </button>
        <button className="h-9 w-[126px] rounded-full bg-primary">
          <p className="text-xs text-white">コンサル終了依頼</p>
        </button>
        <button className="h-9 w-[78px] rounded-full bg-strong">
          <p className="text-xs text-white">回答パス</p>
        </button>
        <img
          src="/icons/btn_menu.svg"
          alt=""
          className="h-9 w-9 cursor-pointer"
        />
      </div>
      <div className="flex h-5 items-center space-x-1 border">
        <p className="text-xxs">E-コンサル</p>
        <p className="text-md font-bold">質問医</p>
        <p className="text-xs">(総合内科・31年目)</p>
      </div>
      <ChatList />
    </div>
  );
};
