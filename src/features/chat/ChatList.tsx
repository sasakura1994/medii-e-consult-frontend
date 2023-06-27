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
      <OtherChat />
      <MyChat />
    </div>
  );
};
