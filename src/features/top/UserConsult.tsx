import React, { useMemo, useState } from 'react';
import TertiaryButton from '@/components/Button/TertiaryButton';
import PrimaryButton from '@/components/Button/PrimaryButton';
import { TopTab } from './TopTab';
import { StyledHiddenScrollBar } from './styled';
import { UserCounsultContent } from './UserConsultContent';
import { UserConsultNoContents } from './UserConsultNoContents';
import Link from 'next/link';
import { useFetchChatRoomMineOwn } from '@/hooks/api/chat/useFetchChatRoomMineOwn';

type UserConsultProps = {
  setShowTutorialExplanationModal: (isShow: boolean) => void;
};

export const UserConsult = (props: UserConsultProps) => {
  const { setShowTutorialExplanationModal } = props;
  const [activeTab, setActiveTab] = useState<'question' | 'answer'>('question');
  const [isOpenAllChatRoom, setIsOpenAllChatRoom] = useState(false);
  const { data: chatRoomMineOwnData } = useFetchChatRoomMineOwn({
    limit: 100,
  });

  const viewData = useMemo(() => {
    if (!chatRoomMineOwnData?.rooms) return [];
    if (activeTab === 'question') {
      return isOpenAllChatRoom
        ? chatRoomMineOwnData.rooms
        : chatRoomMineOwnData.rooms.slice(0, 5);
    } else if (activeTab === 'answer') {
      return isOpenAllChatRoom
        ? chatRoomMineOwnData.rooms
        : chatRoomMineOwnData.rooms.slice(0, 5);
    }
    return [];
  }, [activeTab, chatRoomMineOwnData, isOpenAllChatRoom]);

  return (
    <>
      <div className="mt-5 flex">
        <p className="flex-grow text-xxl font-bold text-text-primary">
          あなたに関わるE-コンサル
        </p>
        <div className="hidden whitespace-nowrap lg:block">
          <Link href="/newchatroom">
            <a>
              <PrimaryButton size="large">新規E-コンサルを作成</PrimaryButton>
            </a>
          </Link>
        </div>
        <div
          className="ml-2 hidden whitespace-nowrap lg:block"
          onClick={() => {
            setShowTutorialExplanationModal(true);
          }}
        >
          <TertiaryButton size="large">E-コンサルとは？</TertiaryButton>
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
      {viewData.map((chatRoomMineOwn) => {
        return (
          <UserCounsultContent
            key={chatRoomMineOwn.chat_room_id}
            chatRoomMineOwn={chatRoomMineOwn}
          />
        );
      })}
      {isOpenAllChatRoom ? (
        <TertiaryButton
          className="mx-auto mt-7 w-full lg:w-auto"
          onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
        >
          閉じる
        </TertiaryButton>
      ) : (
        <TertiaryButton
          size="large"
          className="mx-auto mt-7 w-full lg:w-auto"
          onClick={() => setIsOpenAllChatRoom((prev) => !prev)}
        >
          すべてのE-コンサル
        </TertiaryButton>
      )}
    </>
  );
};
