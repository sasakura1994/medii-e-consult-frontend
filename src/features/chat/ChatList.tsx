import React, { useMemo } from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';

type ChatListProps = {
  chatListData: (ChatData & { displayName: string })[];
  currentUserAccountId: string;
  chatRoomData: FetchChatRoomResponseData;
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
  const { chatListData, chatRoomData, currentUserAccountId } = props;

  const isLastMyChat = useMemo(() => {
    return chatListData[chatListData.length - 1].account_id === currentUserAccountId;
  }, [chatListData, currentUserAccountId]);

  return (
    <div>
      {chatListData &&
        chatRoomData &&
        chatListData.map((c) => {
          const isView = chatRoomData.me?.read_until === c.uid && chatListData[chatListData.length - 1].uid !== c.uid;
          return c.account_id === currentUserAccountId ? (
            <MyChat chatData={c} key={c.uid} chatRoomData={chatRoomData} />
          ) : (
            <>
              <OtherChat chatData={c} key={c.uid} />
              {isView && !isLastMyChat && <NewBorder />}
            </>
          );
        })}
    </div>
  );
};
