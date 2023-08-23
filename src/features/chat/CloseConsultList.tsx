import Link from 'next/link';
import React from 'react';
import { ConsultTitle } from './ConsultTitle';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';

type CloseConsultListProps = {
  chatRoomList?: ChatRoomEntity[];
};

export const CloseConsultList = (props: CloseConsultListProps) => {
  const { chatRoomList } = props;
  const unreadCountsResponseData = useFetchUnreadCounts();
  return (
    <div className="h-full overflow-auto bg-white pb-36">
      {unreadCountsResponseData &&
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
              >
                <a>
                  <ConsultTitle
                    isUnreadConsult={unreadCountsResponseData.unread_consult.some(
                      (c) => c.chat_room_id === chatRoom.chat_room_id
                    )}
                    chatRoomId={chatRoom.chat_room_id}
                    title={chatRoom.title}
                    latestMessage={chatRoom.latest_message}
                    lastUpdatedDate={chatRoom.last_updated_date}
                    ownerAccountId={chatRoom.owner_account_id}
                  />
                </a>
              </Link>
            );
          })}
    </div>
  );
};
