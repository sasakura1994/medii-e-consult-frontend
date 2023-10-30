import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import React, { useMemo, useState } from 'react';
import { ChatDeleteModal } from './ChatDeleteModal';
import { KeyedMutator } from 'swr';

type MyChatProps = {
  chatData: ChatData & { displayName: string };
  chatRoomData: FetchChatRoomResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
};

export const MyChat = (props: MyChatProps) => {
  const { chatData, chatRoomData, setSelectedImage, mutateChatRoom } = props;
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
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
    if (chatData.read_count) {
      if (chatRoomData.members.length > 1) {
        return <p className="mb-3 mr-2 flex items-end text-sm text-block-gray">既読{chatData.read_count}</p>;
      }
      return <p className="mb-3 mr-2 flex items-end text-sm text-block-gray">既読</p>;
    }
    return null;
  }, [chatData, chatRoomData]);

  return (
    <>
      {isOpenDeleteModal && (
        <ChatDeleteModal
          chatRoomId={chatRoomData.chat_room.chat_room_id}
          chatUid={chatData.uid}
          setIsOpenDeleteModal={setIsOpenDeleteModal}
          mutateChatRoom={mutateChatRoom}
        />
      )}
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
          <>
            {unreadView}
            <div
              onMouseOver={() => {
                setIsMouseOver(true);
              }}
              onMouseLeave={() => {
                setIsMouseOver(false);
              }}
            >
              <div
                className="mb-3 mr-3 p-2"
                onMouseOver={() => {
                  setIsMouseOver(true);
                }}
                onMouseLeave={() => {
                  setIsMouseOver(false);
                }}
              >
                <img
                  src={chatData.file_path}
                  alt=""
                  className="aspect-auto h-[250px] cursor-pointer"
                  onClick={() => {
                    setSelectedImage(chatData.file_path);
                  }}
                />
              </div>
            </div>
          </>
        ) : chatData.content_type.startsWith('application/') ? (
          <>
            {unreadView}
            <div
              onMouseOver={() => {
                setIsMouseOver(true);
              }}
              onMouseLeave={() => {
                setIsMouseOver(false);
              }}
            >
              <div
                className="mb-3 mr-3 flex cursor-pointer items-center rounded-lg bg-white p-2"
                onClick={downloadFile}
                onMouseOver={() => {
                  setIsMouseOver(true);
                }}
                onMouseLeave={() => {
                  setIsMouseOver(false);
                }}
              >
                <img src="icons/insert_drive_file.svg" alt="" className="h-10 w-10" />
                <p className="max-w-[670px] whitespace-pre-wrap break-words">{chatData.file_name}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {unreadView}
            <div
              onMouseOver={() => {
                setIsMouseOver(true);
              }}
              onMouseLeave={() => {
                setIsMouseOver(false);
              }}
            >
              <p
                className="mb-3 mr-3 min-w-[200px] max-w-[670px] whitespace-pre-wrap break-words rounded-lg
              rounded-tr-none bg-primary-light p-2"
              >
                {chatData.message}
              </p>
            </div>
          </>
        )}
      </div>
      {isMouseOver && (
        <div
          className="flex justify-end"
          onMouseOver={() => {
            setIsMouseOver(true);
          }}
          onMouseLeave={() => {
            setIsMouseOver(false);
          }}
        >
          <div
            className="float-right -mt-3 mb-3 mr-4 flex h-10 w-24 cursor-pointer items-center justify-center
         gap-1 rounded-b-xl bg-primary"
            onClick={() => {
              setIsOpenDeleteModal(true);
            }}
          >
            <img src="icons/delete.svg" alt="" className="h-6" />
            <span className=" whitespace-nowrap text-sm text-white">削除</span>
          </div>
        </div>
      )}
    </>
  );
};
