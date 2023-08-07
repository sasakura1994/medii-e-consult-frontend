import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';

type ChatListProps = {
  chatListData: FetchChatListResponseData;
  currentUserAccountId: string;
};

export const ChatList = (props: ChatListProps) => {
  const { chatListData, currentUserAccountId } = props;
  return (
    <div>
      {chatListData &&
        chatListData.map((c) => {
          return c.account_id === currentUserAccountId ? <MyChat chatData={c} /> : <OtherChat chatData={c} />;
        })}
    </div>
  );
};
