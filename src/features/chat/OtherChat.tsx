import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchPresignedFileUrl } from '@/hooks/api/chat/useFetchPresignedFileUrl';
import React from 'react';

type OtherChatProps = {
  chatData: ChatData & { displayName: string };
  chatRoomData: FetchChatRoomResponseData;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
};

export const OtherChat = (props: OtherChatProps) => {
  const { chatData, chatRoomData, setSelectedImage } = props;
  const date = new Date(chatData.created_date);
  const { fecthPresignedFileUrl } = useFetchPresignedFileUrl();

  const formattedDate = date.toLocaleString(undefined, {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const downloadFile = async () => {
    try {
      const res = await fecthPresignedFileUrl({
        chat_room_id: chatRoomData.chat_room.chat_room_id,
        file_id: chatData.file_id,
      });

      if (res.data) {
        const response = await fetch(res.data.url);
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: chatData.content_type });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = chatData.file_name;
        document.body.appendChild(downloadLink); // Append to the body
        downloadLink.click();
        document.body.removeChild(downloadLink); // Remove after click
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

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
        ) : chatData.content_type.startsWith('application/') ? (
          <div className="mb-3 mr-3 flex cursor-pointer items-center rounded-lg bg-white p-2" onClick={downloadFile}>
            <img src="icons/insert_drive_file.svg" alt="" className="h-10 w-10" />
            <p className="max-w-[670px] whitespace-pre-wrap break-words">{chatData.file_name}</p>
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
