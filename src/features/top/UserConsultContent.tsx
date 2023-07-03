import TertiaryButton from '@/components/Button/TertiaryButton';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import React, { useMemo } from 'react';

type UserCounsultContentProps = {
  chat: ChatRoomEntity;
};

export const UserCounsultContent = (props: UserCounsultContentProps) => {
  const { chat } = props;
  const timeAgo = useMemo(() => {
    const now = new Date();
    const createdAt = new Date(chat.last_updated_date);
    const diff = now.getTime() - createdAt.getTime();
    const diffMin = Math.floor(diff / 1000 / 60);
    if (diffMin < 60) {
      return `${diffMin}分前`;
    } else if (diffMin < 60 * 24) {
      return `${Math.floor(diffMin / 60)}時間前`;
    } else {
      return `${Math.floor(diffMin / 60 / 24)}日前`;
    }
  }, [chat.last_updated_date]);

  return (
    <div className="flex h-28 items-center border-b border-border-divider p-4">
      <div className="w-5/6">
        <p className="text-l font-bold">{chat.title}</p>
        <p className="text-md text-text-secondary line-clamp-1">
          {chat.latest_message}
        </p>

        <div className="mt-2 flex">
          <p
            className="h-6 w-10 whitespace-nowrap rounded-full bg-medii-sky-base
           px-2 py-0.5 text-center text-medii-sm text-white"
          >
            新着
          </p>
          <p className="test-md ml-2 font-bold text-text-secondary">
            回答医を探しています
          </p>
          <p className="test-md text-text-secondary">・</p>
          <p className="test-md text-text-secondary">{timeAgo}</p>
        </div>
      </div>
      <div className="mx-auto">
        <TertiaryButton size="medium">相談を見る</TertiaryButton>
      </div>
    </div>
  );
};
