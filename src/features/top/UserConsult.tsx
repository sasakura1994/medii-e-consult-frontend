import React, { useMemo, useState } from 'react';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TopTab } from './TopTab';
import { StyledHiddenScrollBar } from './styled';
import { UserCounsultContent } from './UserConsultContent';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { useToken } from '@/hooks/authentication/useToken';
import { UserConsultNoContents } from './UserConsultNoContents';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import Link from 'next/link';

export const UserConsult = () => {
  const [activeTab, setActiveTab] = useState<'question' | 'answer'>('question');
  const [isOpenAllChatRoom, setIsOpenAllChatRoom] = useState(false);
  const { data: chatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const { accountId } = useToken();

  const viewData = useMemo(() => {
    if (!chatRoomList) return [];
    const diffDate = (chat: ChatRoomEntity) => {
      const now = new Date();
      const updatedAt = new Date(chat.last_updated_date);
      const diff = now.getTime() - updatedAt.getTime();
      const diffMin = Math.floor(diff / 1000 / 60);
      // TODO:ここで無理やり1週間以内のものを表示しています。apiの準備ができ次第修正します。
      return diffMin < 60 * 24 * 7 * 4 * 3; // !!一旦確認用に3ヶ月にしています。マージまでに戻すこと!!
    };
    if (activeTab === 'question') {
      const questionChatRoomList = chatRoomList.filter((chat) => {
        return chat.owner_account_id === accountId && diffDate(chat);
      });
      return isOpenAllChatRoom
        ? questionChatRoomList
        : questionChatRoomList.slice(0, 5);
    } else if (activeTab === 'answer') {
      const answerChatRoomList = chatRoomList.filter((chat) => {
        return chat.owner_account_id !== accountId && diffDate(chat);
      });
      return isOpenAllChatRoom
        ? answerChatRoomList
        : answerChatRoomList.slice(0, 5);
    }
    return [];
  }, [accountId, activeTab, chatRoomList, isOpenAllChatRoom]);

  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          あなたに関わるE-コンサル
        </p>
        <div className="hidden whitespace-nowrap lg:block">
          <Link href="/newchatroom">
            <PrimaryButton size="large">新規E-コンサルを作成</PrimaryButton>
          </Link>
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
      {viewData.map((chat, index) => {
        // TODO: モックで適当に文字列を入れています。apiの準備ができ次第修正します。
        return (
          <UserCounsultContent
            key={chat.chat_room_id}
            chat={chat}
            index={index}
          />
        );
      })}
      <TertiaryButton
        size="large"
        className="mx-auto mt-7 w-full lg:w-auto"
        onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
      >
        すべてのE-コンサル
      </TertiaryButton>
    </>
  );
};
