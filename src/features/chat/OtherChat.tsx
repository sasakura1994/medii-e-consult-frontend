import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import React from 'react';

type OtherChatProps = {
  chatData: ChatData & { displayName: string };
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
};

export const OtherChat = (props: OtherChatProps) => {
  const { chatData, setSelectedImage } = props;
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
        <p className="text-sm">{chatData.displayName}</p>
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
            <img
              src={chatData.file_path}
              alt=""
              className="aspect-auto h-[250px] cursor-pointer object-contain"
              onClick={() => {
                setSelectedImage(chatData.file_path);
              }}
            />
          </div>
        ) : chatData.content_type.startsWith('video/') ? (
          <video src={chatData.file_path} className="aspect-auto h-[250px] cursor-pointer object-contain" controls />
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
