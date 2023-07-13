import TertiaryButton from '@/components/Button/TertiaryButton';
import { ChatRoomMineOwnEntity } from '@/hooks/api/chat/useFetchChatRoomMineOwn';
import { getTimeIntervalText } from '@/libs/date';
import Link from 'next/link';
import React, { useMemo } from 'react';

type UserCounsultContentProps = {
  chatRoomMineOwn: ChatRoomMineOwnEntity;
};

export const UserCounsultContent = (props: UserCounsultContentProps) => {
  const { chatRoomMineOwn } = props;

  const labelText = useMemo(() => {
    const activeClass =
      'h-6 w-auto whitespace-nowrap rounded-full bg-medii-sky-base px-2 py-0.5 text-center text-medii-sm text-white';
    const disabledClass = `h-6 w-auto whitespace-nowrap rounded-full
      bg-button-disabled px-2 py-0.5 text-center text-medii-sm text-text-secondary`;
    // TODO: ここの仕様は現在確認中
    switch (chatRoomMineOwn.status) {
      case 'CREATED':
        return <p className={activeClass}>新着</p>;
      case 'ACTIVE':
      case 'REOPEN':
        return <p className={activeClass}>進行中</p>;
      case 'CLOSED':
      case 'RESOLVED':
      case 'TEMP_RESOLVED':
        return <p className={disabledClass}>解決済み</p>;
      default:
        return '';
    }
  }, [chatRoomMineOwn.status]);

  const respondentLabel = useMemo(() => {
    if (
      chatRoomMineOwn.status === 'CREATED' ||
      !chatRoomMineOwn.respondent_label
    ) {
      return '回答医を探しています';
    }
    return chatRoomMineOwn.respondent_label;
  }, [chatRoomMineOwn]);

  return (
    <div className="flex h-28 items-center border-b border-border-divider p-4">
      {/* SP */}
      <Link href={`/chat?chat_room_id=${chatRoomMineOwn.chat_room_id}`}>
        <a className="block lg:hidden">
          <div className="w-full lg:w-5/6">
            <p className="text-l font-bold line-clamp-1">
              {chatRoomMineOwn.title}
            </p>
            <p className="text-md text-text-secondary line-clamp-1">
              {chatRoomMineOwn.latest_message}
            </p>

            <div className="mt-2 flex">
              {labelText}
              <p className="test-md ml-2 font-bold text-text-secondary">
                {respondentLabel}
              </p>
              <p className="test-md text-text-secondary">・</p>
              <p className="test-md text-text-secondary">
                {getTimeIntervalText(chatRoomMineOwn.last_updated_date)}
              </p>
            </div>
          </div>
        </a>
      </Link>
      {/* PC */}
      <div className="hidden w-full lg:block lg:w-5/6">
        <p className="text-l font-bold">{chatRoomMineOwn.title}</p>
        <p className="text-md text-text-secondary line-clamp-1">
          {chatRoomMineOwn.latest_message}
        </p>

        <div className="mt-2 flex">
          {labelText}
          <p className="test-md ml-2 font-bold text-text-secondary">
            {respondentLabel}
          </p>
          <p className="test-md text-text-secondary">・</p>
          <p className="test-md text-text-secondary">
            {getTimeIntervalText(chatRoomMineOwn.last_updated_date)}
          </p>
        </div>
      </div>
      <div className="mx-auto hidden lg:block">
        <Link href={`/chat?chat_room_id=${chatRoomMineOwn.chat_room_id}`}>
          <TertiaryButton size="medium" className="whitespace-nowrap">
            相談を見る
          </TertiaryButton>
        </Link>
      </div>
    </div>
  );
};
