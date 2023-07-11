import TertiaryButton from '@/components/Button/TertiaryButton';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import Link from 'next/link';
import React, { useMemo } from 'react';

type UserCounsultContentProps = {
  chat: ChatRoomEntity;
  index: number; // TODO: モックデータのため、後で消す
};

export const UserCounsultContent = (props: UserCounsultContentProps) => {
  const { chat, index } = props;

  const timeAgo = useMemo(() => {
    const now = new Date();
    const updatedAt = new Date(chat.last_updated_date);
    const diff = now.getTime() - updatedAt.getTime();
    const diffMin = Math.floor(diff / 1000 / 60);
    if (diffMin < 60) {
      return `${diffMin}分前`;
    } else if (diffMin < 60 * 24) {
      return `${Math.floor(diffMin / 60)}時間前`;
    } else if (diffMin < 60 * 24 * 7) {
      return `${Math.floor(diffMin / 60 / 24)}日前`;
    } else if (diffMin < 60 * 24 * 7 * 4) {
      return `${Math.floor(diffMin / 60 / 24 / 7)}週間前`;
    } else if (diffMin < 60 * 24 * 7 * 4 * 12) {
      return `${Math.floor(diffMin / 60 / 24 / 7 / 4)}ヶ月前`;
    } else {
      return `${Math.floor(diffMin / 60 / 24 / 7 / 4 / 12)}年前`;
    }
  }, [chat.last_updated_date]);

  const labelText = useMemo(() => {
    const activeClass =
      'h-6 w-auto whitespace-nowrap rounded-full bg-medii-sky-base px-2 py-0.5 text-center text-medii-sm text-white';
    const disabledClass = `h-6 w-auto whitespace-nowrap rounded-full
      bg-button-disabled px-2 py-0.5 text-center text-medii-sm text-text-secondary`;
    // TODO: ここの仕様は現在確認中
    switch (chat.status) {
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
  }, [chat.status]);
  // TODO: モック
  const assigneeName = useMemo(() => {
    switch ((index + 1) % 3) {
      case 0:
        return '回答医を探しています';
      case 1:
        return 'メディ大学グループが回答';
      case 2:
        return '山田裕揮先生が回答';
      default:
        return '回答医を探しています';
    }
  }, [index]);

  return (
    <div className="flex h-28 items-center border-b border-border-divider p-4">
      {/* SP */}
      <Link href={`/chat?chat_room_id=${chat.chat_room_id}`}>
        <a className="block lg:hidden">
          <div className="w-full lg:w-5/6">
            <p className="text-l font-bold line-clamp-1">{chat.title}</p>
            <p className="text-md text-text-secondary line-clamp-1">
              {chat.latest_message}
            </p>

            <div className="mt-2 flex">
              {labelText}
              <p className="test-md ml-2 font-bold text-text-secondary">
                {assigneeName}
              </p>
              <p className="test-md text-text-secondary">・</p>
              <p className="test-md text-text-secondary">{timeAgo}</p>
            </div>
          </div>
        </a>
      </Link>
      {/* PC */}
      <div className="hidden w-full lg:block lg:w-5/6">
        <p className="text-l font-bold">{chat.title}</p>
        <p className="text-md text-text-secondary line-clamp-1">
          {chat.latest_message}
        </p>

        <div className="mt-2 flex">
          {labelText}
          <p className="test-md ml-2 font-bold text-text-secondary">
            {assigneeName}
          </p>
          <p className="test-md text-text-secondary">・</p>
          <p className="test-md text-text-secondary">{timeAgo}</p>
        </div>
      </div>
      <div className="mx-auto hidden lg:block">
        <Link href={`/chat?chat_room_id=${chat.chat_room_id}`}>
          <TertiaryButton size="medium" className="whitespace-nowrap">
            相談を見る
          </TertiaryButton>
        </Link>
      </div>
    </div>
  );
};
