import React, { useMemo, useState } from 'react';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TopTab } from './TopTab';
import { StyledHiddenScrollBar } from './styled';
import { UserCounsultContent } from './UserConsultContent';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { useToken } from '@/hooks/authentication/useToken';
import { UserConsultNoContents } from './UserConsultNoContents';

export const UserConsult = () => {
  const [activeTab, setActiveTab] = useState<'question' | 'answer'>('question');
  const { data: chatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const { accountId } = useToken();

  const viewData = useMemo(() => {
    if (!chatRoomList) return [];
    if (activeTab === 'question') {
      return chatRoomList.filter((chat) => {
        return chat.owner_account_id === accountId;
      });
    } else if (activeTab === 'answer') {
      return chatRoomList.filter((chat) => {
        return chat.owner_account_id !== accountId;
      });
    }
    return [];
  }, [accountId, activeTab, chatRoomList]);

  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          あなたに関わるE-コンサル
        </p>
        <div className="hidden whitespace-nowrap lg:block">
          <PrimaryButton size="large">新規E-コンサルを作成</PrimaryButton>
        </div>
        <div className="ml-2 hidden whitespace-nowrap lg:block">
          <TertiaryButton size="large">E-コンサルの使い方</TertiaryButton>
        </div>
      </div>

      <StyledHiddenScrollBar className="mt-5 flex items-end overflow-y-hidden overflow-x-scroll">
        <TopTab
          text="自分が質問"
          isActive={activeTab === 'question'}
          onClick={() => {
            setActiveTab('question');
          }}
        />
        <TopTab
          text="自分が回答"
          isActive={activeTab === 'answer'}
          onClick={() => {
            setActiveTab('answer');
          }}
          isLast
        />
        <div className="w-auto border-b" />
      </StyledHiddenScrollBar>
      {viewData.length <= 0 && <UserConsultNoContents />}
      {viewData.map((chat) => {
        return <UserCounsultContent key={chat.chat_room_id} chat={chat} />;
      })}
    </>
  );
};
