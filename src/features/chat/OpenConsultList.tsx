import Link from 'next/link';
import React, { useState } from 'react';
import { ConsultTitle } from './ConsultTitle';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';

type OpenConsultListProps = {
  chatRoomList?: ChatRoomEntity[];
};

export const OpenConsultList = (props: OpenConsultListProps) => {
  const { chatRoomList } = props;
  const [isOpenedConultList, setIsOpenedConsultList] = useState(true);
  const [isOpenedGroupList, setIsOpenedGroupList] = useState(true);
  const unreadCountsResponseData = useFetchUnreadCounts();
  return (
    <div className="h-full overflow-auto bg-white pb-36">
      <button
        className=" flex h-10 w-full cursor-pointer items-center border-t-black bg-[#f1f1f1] hover:bg-btn-hover-gray"
        onClick={() => setIsOpenedConsultList((prev) => !prev)}
      >
        <img src="icons/human_single.svg" alt="" className="ml-3 mr-3 h-6 w-6" />
        <p className="text-md font-bold text-[#333333]">
          マンツーマン [
          {chatRoomList
            ? chatRoomList.filter(
                (c) =>
                  c.room_type !== 'GROUP' &&
                  (c.status === 'CREATED' ||
                    c.status === 'ACTIVE' ||
                    c.status === 'REOPEN' ||
                    c.status === 'TEMP_RESOLVED')
              ).length
            : 0}
          ]
        </p>
        {isOpenedConultList ? (
          <img src="icons/arrow_down.svg" alt="" className="ml-auto mr-3 h-4 w-4" />
        ) : (
          <img src="icons/arrow_right.svg" alt="" className="ml-auto mr-3 h-4 w-4" />
        )}
      </button>
      {isOpenedConultList &&
        unreadCountsResponseData &&
        chatRoomList &&
        chatRoomList
          .filter(
            (c) =>
              c.room_type !== 'GROUP' &&
              (c.status === 'CREATED' || c.status === 'ACTIVE' || c.status === 'REOPEN' || c.status === 'TEMP_RESOLVED')
          )
          .map((chatRoom) => {
            return (
              <Link
                key={chatRoom.chat_room_id}
                href={{
                  pathname: '/chat',
                  query: { chat_room_id: chatRoom.chat_room_id },
                }}
              >
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
              </Link>
            );
          })}
      <button
        className="flex h-10 w-full cursor-pointer items-center border-t-black bg-[#f1f1f1] hover:bg-btn-hover-gray"
        onClick={() => setIsOpenedGroupList((prev) => !prev)}
      >
        <img src="icons/human_double.svg" alt="" className="ml-3 mr-3 h-6 w-6" />
        <p className="text-md font-bold text-[#333333]">
          グループ[
          {chatRoomList
            ? chatRoomList.filter(
                (c) =>
                  c.room_type === 'GROUP' &&
                  (c.status === 'CREATED' ||
                    c.status === 'ACTIVE' ||
                    c.status === 'REOPEN' ||
                    c.status === 'TEMP_RESOLVED')
              ).length
            : 0}
          ]
        </p>
        {isOpenedGroupList ? (
          <img src="icons/arrow_down.svg" alt="" className="ml-auto mr-3 h-4 w-4" />
        ) : (
          <img src="icons/arrow_right.svg" alt="" className="ml-auto mr-3 h-4 w-4" />
        )}
      </button>
      {isOpenedGroupList &&
        unreadCountsResponseData &&
        chatRoomList &&
        chatRoomList
          .filter(
            (c) =>
              c.room_type === 'GROUP' &&
              (c.status === 'CREATED' || c.status === 'ACTIVE' || c.status === 'REOPEN' || c.status === 'TEMP_RESOLVED')
          )
          .map((chatRoom) => {
            return (
              <Link
                key={chatRoom.chat_room_id}
                href={{
                  pathname: '/chat',
                  query: { chat_room_id: chatRoom.chat_room_id },
                }}
              >
                <ConsultTitle
                  chatRoomId={chatRoom.chat_room_id}
                  isUnreadConsult={unreadCountsResponseData.unread_consult.some(
                    (c) => c.chat_room_id === chatRoom.chat_room_id
                  )}
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
