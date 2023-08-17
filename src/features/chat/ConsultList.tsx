import React, { useState } from 'react';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { OpenConsultList } from './OpenConsultList';

export const ConsultList = () => {
  const { data: chatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const [selectedTab, setSelectedTab] = useState<'open' | 'close'>('open');

  return (
    <div className="h-screen w-[336px] border border-[#d5d5d5]">
      <div className="flex h-14 items-center bg-primary">
        <img src="/icons/consult_list.svg" alt="" className="ml-2 h-7 w-8" />
        <p className="text-md font-bold text-white">コンサル一覧</p>
        <button className="ml-3 rounded-full border border-white px-2 py-1 text-md font-bold text-white">
          ＋匿名でコンサル作成
        </button>
      </div>
      <div className="flex h-10 bg-white">
        <div
          className={`flex w-full cursor-pointer items-center justify-center border-b-2 ${
            selectedTab === 'open' ? 'border-primary' : 'border-block-gray'
          }`}
          onClick={() => setSelectedTab('open')}
        >
          <p className="text-sm text-primary">コンサル中</p>
        </div>
        <div
          className={`flex w-full cursor-pointer items-center justify-center border-b-2 ${
            selectedTab === 'close' ? 'border-primary' : 'border-block-gray'
          }`}
          onClick={() => setSelectedTab('close')}
        >
          <p className="text-sm">解決済み</p>
        </div>
      </div>
      {selectedTab === 'open' && <OpenConsultList chatRoomList={chatRoomList} />}
    </div>
  );
};
