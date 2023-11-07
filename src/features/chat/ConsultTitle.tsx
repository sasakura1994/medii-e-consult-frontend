import { loadLocalStorage } from '@/libs/LocalStorageManager';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

type Query = {
  chat_room_id: string;
};

type ConsultTitleProps = {
  chatRoomId: string;
  isUnreadConsult: boolean;
  title: string;
  latestMessage: string;
  lastUpdatedDate: string;
  ownerAccountId: string;
};

export const ConsultTitle = (props: ConsultTitleProps) => {
  const { title, latestMessage, lastUpdatedDate, isUnreadConsult, chatRoomId } = props;
  const router = useRouter();
  const { chat_room_id } = router.query as Query;

  const isSelected = useMemo(() => {
    return chat_room_id === chatRoomId;
  }, [chat_room_id, chatRoomId]);

  const date = new Date(lastUpdatedDate);

  const formattedDate = date.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const currentDrafts = JSON.parse(loadLocalStorage('ChatDraft::List') || '{}');
  const isExistDraft = currentDrafts[chatRoomId] !== undefined;

  return (
    <div
      className={`h-auto min-h-[64px] cursor-pointer border-b border-[#d5d5d5] pb-2
       hover:bg-primary-light active:bg-primary-light ${isSelected && 'bg-primary-light'}`}
    >
      <div className="flex items-center">
        {isUnreadConsult ? (
          <div className="ml-3 mt-2 h-[10px] w-[10px] rounded-full bg-[#63dce3] " />
        ) : (
          <div className="ml-5" />
        )}
        <p className="ml-2 mt-2 flex-grow text-l font-bold">{title}</p>
        <p className="mr-3 mt-3 text-xs">{formattedDate}</p>
      </div>
      {isExistDraft && <img src="icons/edit.svg" alt="下書きあり" className="ml-auto mr-5" />}
      <p className="ml-9 mr-3 line-clamp-2 text-sm text-[#999999]">{latestMessage}</p>
    </div>
  );
};
