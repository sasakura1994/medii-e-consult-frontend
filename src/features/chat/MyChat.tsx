import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import React from 'react';

type MyChatProps = {
  chatData: ChatData & { displayName: string };
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
  const downloadFile = async () => {
    const a = document.createElement('a');
    a.href = chatData.file_path;
    a.download = chatData.file_name;
    a.target = '_blank';
    a.rel = 'noreferrer';
    a.click();
  };

  return (
    <>
      <div className="mr-3 flex justify-end">
        <p className="text-sm text-block-gray">{chatData.displayName}</p>
        <p className="ml-1 text-sm text-block-gray">{formattedDate}</p>
      </div>
      <div className="flex justify-end">
        {chatData.deleted ? (
          <p
            className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap rounded-lg rounded-tr-none
           bg-block-gray p-2 text-white"
          >
            削除済みメッセージ
          </p>
        ) : chatData.content_type.startsWith('image/') ? (
          <div className="mb-3 mr-3 p-2">
            <img src={chatData.file_path} alt="" className="aspect-auto h-[250px]" />
          </div>
        ) : chatData.content_type.startsWith('application/') ? (
          <div className="mb-3 mr-3 flex cursor-pointer items-center rounded-lg bg-white p-2" onClick={downloadFile}>
            <img src="icons/insert_drive_file.svg" alt="" className="h-10 w-10" />
            <p className="max-w-[670px] whitespace-pre-wrap break-words">{chatData.file_name}</p>
          </div>
        ) : (
          <p
            className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap break-words rounded-lg rounded-tr-none
           bg-primary-light p-2"
          >
            {chatData.message}
          </p>
        )}
      </div>
    </>
  );
};