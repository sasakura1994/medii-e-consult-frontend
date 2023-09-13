import React from 'react';
import { OtherChat } from './OtherChat';
import { MyChat } from './MyChat';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';

type ChatListProps = {
  chatListData: (ChatData & { displayName: string })[];
  currentUserAccountId: string;
  chatRoomData: FetchChatRoomResponseData;
  firstUnreadCount: number;
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
  const { chatListData, chatRoomData, currentUserAccountId, firstUnreadCount } = props;
  return (
    <div>
      {chatListData &&
        chatRoomData &&
        chatListData.map((c, index) => {
          return c.account_id === currentUserAccountId ? (
            <MyChat chatData={c} key={c.uid} chatRoomData={chatRoomData} />
          ) : (
            <>
              {chatListData.length - firstUnreadCount === index && <NewBorder />}
              <OtherChat chatData={c} key={c.uid} />
            </>
          );
        })}
    </div>
  );
};
