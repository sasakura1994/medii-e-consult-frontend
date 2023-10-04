import TertiaryButton from '@/components/Button/TertiaryButton';
import { ChatRoomMineOwnEntity } from '@/hooks/api/chat/useFetchChatRoomMineOwn';
import { getTimeIntervalText } from '@/libs/date';
import Link from 'next/link';
import React, { useMemo } from 'react';

type UserConsultQuestionContentProps = {
  chatRoomMineOwn: ChatRoomMineOwnEntity;
};

export const UserConsultQuestionContent = (props: UserConsultQuestionContentProps) => {
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
      case 'TEMP_RESOLVED':
        return <p className={activeClass}>進行中</p>;
      case 'CLOSED':
      case 'RESOLVED':
        return <p className={disabledClass}>解決済み</p>;
      default:
        return '';
    }
  }, [chatRoomMineOwn.status]);

  const respondentLabel = useMemo(() => {
    if (chatRoomMineOwn.status === 'CREATED') {
      return '回答医を探しています';
    } else if (chatRoomMineOwn.room_type === 'GROUP') {
      return chatRoomMineOwn.attending_group_name + ' グループが回答';
    } else {
      return chatRoomMineOwn.attending_doctor_names[0] + ' 先生が回答';
    }
  }, [chatRoomMineOwn]);

  return (
    <div className="flex min-h-[112px] items-center border-b border-border-divider p-4">
      {/* SP */}
      <Link href={`/chat?chat_room_id=${chatRoomMineOwn.chat_room_id}`} className="block lg:hidden">
        <div className="w-full lg:w-5/6">
          <p className="line-clamp-1 text-l font-bold">{chatRoomMineOwn.title}</p>
          <div className="flex items-center">
            {chatRoomMineOwn.unread_count > 0 && (
              <div className="mr-1 aspect-square h-2 w-2 rounded-full bg-medii-sky-base" />
            )}
            <p className="line-clamp-1 text-md text-text-secondary">{chatRoomMineOwn.latest_message}</p>
          </div>
          <div className="mt-2 flex items-center">
            {labelText}
            <p className="test-md ml-2 font-bold text-text-secondary">{respondentLabel}</p>
            <p className="test-md text-text-secondary">・</p>
            <p className="test-md text-text-secondary">{getTimeIntervalText(chatRoomMineOwn.last_updated_date)}</p>
          </div>
        </div>
      </Link>
      {/* PC */}
      <div className="hidden w-full lg:block lg:w-5/6">
        <p className="text-l font-bold">{chatRoomMineOwn.title}</p>
        <div className="flex items-center">
          {chatRoomMineOwn.unread_count > 0 && (
            <div className="mr-1 aspect-square h-2 w-2 rounded-full bg-medii-sky-base" />
          )}
          <p className="line-clamp-1 text-md text-text-secondary">{chatRoomMineOwn.latest_message}</p>
        </div>

        <div className="mt-2 flex">
          {labelText}
          <p className="test-md ml-2 font-bold text-text-secondary">{respondentLabel}</p>
          <p className="test-md text-text-secondary">・</p>
          <p className="test-md text-text-secondary">{getTimeIntervalText(chatRoomMineOwn.last_updated_date)}</p>
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
