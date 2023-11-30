import Link from 'next/link';
import React from 'react';
import { ConsultTitle } from './ConsultTitle';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { FetchUnreadCountsResponseData } from '@/hooks/api/chat/useFetchUnreadCounts';
import { useCloseConsultList } from './useCloseConsultList';

type CloseConsultListProps = {
  chatRoomList?: ChatRoomEntity[];
  unreadCountList?: FetchUnreadCountsResponseData;
};

export const CloseConsultList = (props: CloseConsultListProps) => {
  const { chatRoomList, unreadCountList } = props;
  const { scrollContainerRef, setChatGlobalState } = useCloseConsultList();

  return (
    <div className="h-full overflow-auto bg-white pb-36" ref={scrollContainerRef}>
      {unreadCountList &&
        chatRoomList &&
        chatRoomList
          .filter((c) => c.status === 'CLOSED' || c.status === 'RESOLVED')
          .map((chatRoom) => {
            return (
              <Link
                key={chatRoom.chat_room_id}
                href={{
                  pathname: '/chat',
                  query: { chat_room_id: chatRoom.chat_room_id },
                }}
                onClick={() => {
                  const scrollPosition = scrollContainerRef.current?.scrollTop;
                  setChatGlobalState((prev) => ({
                    ...prev,
                    isSelected: true,
                    closeChatScrollPosition: scrollPosition || 0,
                  }));
                }}
              >
                <ConsultTitle
                  isUnreadConsult={unreadCountList.unread_consult.some((c) => c.chat_room_id === chatRoom.chat_room_id)}
                  chatRoomId={chatRoom.chat_room_id}
                  title={chatRoom.title}
                  latestMessage={chatRoom.latest_message}
                  lastUpdatedDate={chatRoom.last_updated_date}
                  ownerAccountId={chatRoom.owner_account_id}
                />
              </Link>
            );
          })}
    </div>
  );
};
