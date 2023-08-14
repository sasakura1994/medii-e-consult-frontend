import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';

type ChatListProps = {
  chatListData: (ChatData & { displayName: string })[];
  currentUserAccountId: string;
};

export const ChatList = (props: ChatListProps) => {
  const { chatListData, currentUserAccountId } = props;
  return (
    <div>
      {chatListData &&
        chatListData.map((c) => {
          return c.account_id === currentUserAccountId ? (
            <MyChat chatData={c} key={c.uid} />
          ) : (
            <OtherChat chatData={c} key={c.uid} />
          );
        })}
    </div>
  );
};
