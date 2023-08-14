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
      <div className="ml-3 flex justify-start">
        {chatData.deleted ? (
          <p
            className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap rounded-lg rounded-tl-none
           bg-block-gray p-2 text-white"
          >
            削除済みメッセージ
          </p>
        ) : chatData.content_type.startsWith('image/') ? (
          <div className="mb-3 mr-3 p-2">
            <img src={chatData.file_path} alt="" className="aspect-auto h-[250px]" />
          </div>
        ) : (
          <p
            className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap break-words rounded-lg rounded-tl-none
           bg-white p-2"
          >
            {chatData.message}
          </p>
        )}
      </div>
    </>
  );
};
