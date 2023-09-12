import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';

type ChatListProps = {
  chatListData: (ChatData & { displayName: string })[];
  currentUserAccountId: string;
  chatRoomData: FetchChatRoomResponseData;
};

export const ChatList = (props: ChatListProps) => {
  const { chatListData, chatRoomData, currentUserAccountId } = props;
  return (
    <div>
      {chatListData &&
        chatRoomData &&
        chatListData.map((c) => {
          return c.account_id === currentUserAccountId ? (
            <MyChat chatData={c} key={c.uid} chatRoomData={chatRoomData} />
          ) : (
            <OtherChat chatData={c} key={c.uid} />
          );
        })}
    </div>
  );
};
