import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import React from 'react';

type OtherChatProps = {
  chatData: ChatData;
};

export const OtherChat = (props: OtherChatProps) => {
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
      <div className="ml-3 flex">
        <p className="text-sm">総合内科 31年目</p>
        <p className="ml-1 text-sm text-block-gray">{formattedDate}</p>
      </div>

      <p className="mb-3 ml-3 max-w-[670px] whitespace-pre-wrap rounded-lg bg-white p-2">{chatData.message}</p>
    </>
  );
};
