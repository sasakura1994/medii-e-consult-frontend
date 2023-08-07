import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import React from 'react';

type MyChatProps = {
  chatData: ChatData;
};

export const MyChat = (props: MyChatProps) => {
  const { chatData } = props;
  const date = new Date(chatData.created_date);
  const formattedDate = date.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  return (
    <>
      <div className="mr-3 flex justify-end">
        <p className="text-sm">自分</p>
        <p className="ml-1 text-sm text-block-gray">{formattedDate}</p>
      </div>
      <div className="flex justify-end">
        {chatData.deleted ? (
          <p className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap rounded-lg bg-block-gray p-2 text-white">
            削除済みメッセージ
          </p>
        ) : (
          <p className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap rounded-lg bg-primary-light p-2">
            {chatData.message}
          </p>
        )}
      </div>
    </>
  );
};
