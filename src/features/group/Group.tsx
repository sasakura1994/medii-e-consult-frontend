import React from 'react';
import Link from 'next/link';
import { GroupList } from './GroupList';
import { GroupDetail } from './GroupDetail';
import { useGroup } from './useGroup';

export const Group = () => {
  const {
    group_room_id,
    isGroupSelected,
    groupRoomList,
    chatRoomData,
    medicalSpecialities,
    chatListData,
    mutateChatRoom,
    mutateChatRoomList,
    mutateChatList,
    fetchNewChatList,
    resetChatListFromUid,
  } = useGroup();
  return (
    <div className="flex h-full bg-white">
      <GroupList groupRoomList={groupRoomList} />
      {group_room_id && isGroupSelected ? (
        <GroupDetail
          chatRoomData={chatRoomData}
          medicalSpecialities={medicalSpecialities}
          chatListData={chatListData}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
          mutateChatList={mutateChatList}
          fetchNewChatList={fetchNewChatList}
          resetChatListFromUid={resetChatListFromUid}
        />
      ) : (
        <div className="hidden h-screen flex-grow flex-col border border-[#d5d5d5] bg-bg lg:flex" />
      )}
      <div className="hidden h-[calc(100vh-62px)] w-[316px] flex-shrink-0 flex-grow-0 flex-col justify-between lg:flex">
        <div className="block" />
        <div className="mb-2 ml-2 flex flex-col">
          <Link href="privacyPolicy" className="text-sm text-[#999999] underline">
            プライバシーポリシー
          </Link>
          <a
            href="https://e-consult.medii.jp/doc/terms_of_usage.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#999999] underline"
          >
            利用規約
          </a>
        </div>
      </div>
    </div>
  );
};
