import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { ChatData, FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { KeyedMutator } from 'swr';

type ChatListProps = {
  chatListData: (ChatData & { displayName: string })[];
  currentUserAccountId: string;
  chatRoomData: FetchChatRoomResponseData;
  mutateChatList?: KeyedMutator<FetchChatListResponseData>;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
};

const NewBorder = () => {
  return (
    <div className="mx-3 flex">
      <div className="mt-3 w-auto flex-grow border-spacing-6 border-t-[0.5px] border-strong" />
      <p className="text-strong">NEW</p>
    </div>
  );
};

export const ChatList = (props: ChatListProps) => {
  const { chatListData, chatRoomData, currentUserAccountId, mutateChatList, setSelectedImage } = props;

  return (
    <div>
      {chatListData &&
        chatRoomData &&
        chatListData.map((c) => {
          const isMyChat = c.account_id === currentUserAccountId;
          const isLastRead = chatRoomData.me?.read_until === c.uid;
          return (
            <div key={c.uid}>
              {isMyChat ? (
                <MyChat
                  chatData={c}
                  chatRoomData={chatRoomData}
                  mutateChatList={mutateChatList}
                  setSelectedImage={setSelectedImage}
                />
              ) : (
                <>
                  <OtherChat chatData={c} chatRoomData={chatRoomData} setSelectedImage={setSelectedImage} />
                  {isLastRead && chatListData[chatListData.length - 1].uid !== chatRoomData.me?.read_until && (
                    <NewBorder />
                  )}
                </>
              )}
            </div>
          );
        })}
    </div>
  );
};
