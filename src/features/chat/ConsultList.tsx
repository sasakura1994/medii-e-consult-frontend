import React from 'react';
import { OpenConsultList } from './OpenConsultList';
import { CloseConsultList } from './CloseConsultList';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { isChatRoomSelectedState } from '@/globalStates/chat';

type ConsultListProps = {
  chatRoomList?: ChatRoomEntity[];
  selectedTab: 'open' | 'close';
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
};

export const ConsultList = (props: ConsultListProps) => {
  const { chatRoomList, selectedTab, setSelectedTab } = props;
  const isChatRoomSelected = useRecoilValue(isChatRoomSelectedState);
  const unreadCountListData = useFetchUnreadCounts();

  return (
    <div
      className={`h-[calc(100vh-20px)] w-full border border-[#d5d5d5] lg:w-[336px] ${
        isChatRoomSelected ? 'hidden lg:block' : 'block'
      }`}
    >
      <div className="flex h-14 items-center bg-primary">
        <img src="icons/consult_list.svg" alt="" className="ml-2 h-7 w-8" />
        <p className="text-md font-bold text-white">コンサル一覧</p>
        <Link
          href="newchatroom"
          className="ml-3 rounded-full border border-white px-2 py-1 text-md font-bold text-white"
        >
          ＋匿名でコンサル作成
        </Link>
      </div>
      <div className="flex h-10 bg-white">
        <div
          className={`flex w-full cursor-pointer items-center justify-center border-b-2 ${
            selectedTab === 'open' ? 'border-primary' : 'border-block-gray'
          }`}
          onClick={() => setSelectedTab('open')}
        >
          <p className={`text-sm ${selectedTab === 'open' && 'text-primary'}`}>コンサル中</p>
        </div>
        <div
          className={`flex w-full cursor-pointer items-center justify-center border-b-2 ${
            selectedTab === 'close' ? 'border-primary' : 'border-block-gray'
          }`}
          onClick={() => setSelectedTab('close')}
        >
          <p className={`text-sm ${selectedTab === 'close' && 'text-primary'}`}>解決済み</p>
        </div>
      </div>
      {selectedTab === 'open' && <OpenConsultList chatRoomList={chatRoomList} />}
      {selectedTab === 'close' && (
        <CloseConsultList chatRoomList={chatRoomList} unreadCountList={unreadCountListData} />
      )}
    </div>
  );
};
