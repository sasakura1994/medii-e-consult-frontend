import React, { useState } from 'react';
import { ConsultTitle } from './ConsultTitle';
import { useFetchChatRoomList } from '@/hooks/api/chat/useFetchChatRoomList';
import { useFetchUnreadCounts } from '@/hooks/api/chat/useFetchUnreadCounts';

export const ConsultList = () => {
  const [isOpenedConultList, setIsOpenedConsultList] = useState(true);
  const [isOpenedGroupList, setIsOpenedGroupList] = useState(true);
  const { data: chatRoomList } = useFetchChatRoomList({
    query: ['FREE', 'BY_NAME', 'GROUP'],
  });
  const unreadCountsResponseData = useFetchUnreadCounts();
  return (
    <div className="h-screen w-[336px] border border-[#d5d5d5]">
      <div className="flex h-14 items-center bg-primary">
        <img src="/icons/consult_list.svg" alt="" className="ml-2 h-7 w-8" />
        <p className="text-md font-bold text-white">コンサル一覧</p>
        <button className="ml-3 rounded-full border border-white px-2 py-1 text-md font-bold text-white">
          ＋匿名でコンサル作成
        </button>
      </div>
      <div className="flex h-10">
        <div className="flex w-full cursor-pointer items-center justify-center border-b-2 border-primary">
          <p className="text-sm text-primary">コンサル中</p>
        </div>
        <div className="flex w-full cursor-pointer items-center justify-center border-b-2 border-block-gray">
          <p className="text-sm">解決済み</p>
        </div>
      </div>
      <div className="h-full overflow-scroll pb-36">
        <button
          className="flex h-10 w-full cursor-pointer items-center bg-[#f1f1f1] hover:bg-btn-hover-gray"
          onClick={() => setIsOpenedConsultList((prev) => !prev)}
        >
          <img
            src="/icons/human_single.svg"
            alt=""
            className="ml-3 mr-3 h-6 w-6"
          />
          <p className="text-md font-bold text-text-secondary">
            マンツーマン [
            {chatRoomList
              ? chatRoomList.filter(
                  (c) =>
                    c.room_type !== 'GROUP' &&
                    (c.status === 'CREATED' ||
                      c.status === 'ACTIVE' ||
                      c.status === 'REOPEN')
                ).length
              : 0}
            ]
          </p>
          {isOpenedConultList ? (
            <img
              src="/icons/arrow_down.svg"
              alt=""
              className="ml-auto mr-3 h-4 w-4"
            />
          ) : (
            <img
              src="/icons/arrow_right.svg"
              alt=""
              className="ml-auto mr-3 h-4 w-4"
            />
          )}
        </button>
        {isOpenedConultList &&
          unreadCountsResponseData &&
          chatRoomList &&
          chatRoomList
            .filter(
              (c) =>
                c.room_type !== 'GROUP' &&
                (c.status === 'CREATED' ||
                  c.status === 'ACTIVE' ||
                  c.status === 'REOPEN')
            )
            .map((chatRoom) => {
              return (
                <ConsultTitle
                  key={chatRoom.chat_room_id}
                  isUnreadConsult={unreadCountsResponseData.unread_consult.some(
                    (c) => c.chat_room_id === chatRoom.chat_room_id
                  )}
                  chatRoomId={chatRoom.chat_room_id}
                  title={chatRoom.title}
                  latestMessage={chatRoom.latest_message}
                  lastUpdatedDate={chatRoom.last_updated_date}
                  ownerAccountId={chatRoom.owner_account_id}
                />
              );
            })}
        <button
          className="flex h-10 w-full cursor-pointer items-center bg-[#f1f1f1] hover:bg-btn-hover-gray"
          onClick={() => setIsOpenedGroupList((prev) => !prev)}
        >
          <img
            src="/icons/human_double.svg"
            alt=""
            className="ml-3 mr-3 h-6 w-6"
          />
          <p className="text-md font-bold text-text-secondary">
            グループ[
            {chatRoomList
              ? chatRoomList.filter(
                  (c) =>
                    c.room_type === 'GROUP' &&
                    (c.status === 'CREATED' ||
                      c.status === 'ACTIVE' ||
                      c.status === 'REOPEN')
                ).length
              : 0}
            ]
          </p>
          {isOpenedGroupList ? (
            <img
              src="/icons/arrow_down.svg"
              alt=""
              className="ml-auto mr-3 h-4 w-4"
            />
          ) : (
            <img
              src="/icons/arrow_right.svg"
              alt=""
              className="ml-auto mr-3 h-4 w-4"
            />
          )}
        </button>
        {isOpenedGroupList &&
          unreadCountsResponseData &&
          chatRoomList &&
          chatRoomList
            .filter(
              (c) =>
                c.room_type === 'GROUP' &&
                (c.status === 'CREATED' ||
                  c.status === 'ACTIVE' ||
                  c.status === 'REOPEN')
            )
            .map((chatRoom) => {
              return (
                <ConsultTitle
                  key={chatRoom.chat_room_id}
                  chatRoomId={chatRoom.chat_room_id}
                  isUnreadConsult={unreadCountsResponseData.unread_consult.some(
                    (c) => c.chat_room_id === chatRoom.chat_room_id
                  )}
                  title={chatRoom.title}
                  latestMessage={chatRoom.latest_message}
                  lastUpdatedDate={chatRoom.last_updated_date}
                  ownerAccountId={chatRoom.owner_account_id}
                />
              );
            })}
      </div>
    </div>
  );
};
