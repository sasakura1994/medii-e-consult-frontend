import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';

type ChatListProps = {
  chatListData: FetchChatListResponseData;
  currentUserAccountId: string;
  myUserDisplayName: string;
};

export const ChatList = (props: ChatListProps) => {
  const { chatListData, currentUserAccountId, myUserDisplayName } = props;
  return (
    <div>
      {chatListData &&
        chatListData.map((c) => {
          return c.account_id === currentUserAccountId ? (
            <MyChat chatData={c} myUserDisplayName={myUserDisplayName} />
          ) : (
            <OtherChat chatData={c} />
          );
        })}
    </div>
  );
};
