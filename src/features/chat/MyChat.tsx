import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useMemo } from 'react';

type MyChatProps = {
  chatData: ChatData & { displayName: string };
  chatRoomData: FetchChatRoomResponseData;
};

export const MyChat = (props: MyChatProps) => {
  const { chatData, chatRoomData } = props;
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
  const unreadView = useMemo(() => {
    if (chatData.unread_count) {
      if (chatRoomData.members.length > 1) {
        return <p className="mb-3 mr-2 flex items-end text-sm text-block-gray">既読{chatData.unread_count}</p>;
      }
      return <p className="mb-3 mr-2 flex items-end text-sm text-block-gray">既読</p>;
    }
    return null;
  }, [chatData.unread_count, chatRoomData]);

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
          <>
            {unreadView}
            <p
              className="mb-3 mr-3 max-w-[670px] whitespace-pre-wrap break-words rounded-lg rounded-tr-none
           bg-primary-light p-2"
            >
              {chatData.message}
            </p>
          </>
        )}
      </div>
    </>
  );
};
