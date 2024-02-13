import React from 'react';
import { ConsultList } from './ConsultList';
import { ConsultDetail } from './ConsultDetail';
import Link from 'next/link';
import { HubspotCTA } from './HubspotCTA';
import { useChat } from './useChat';

export const Chat = () => {
  const {
    chat_room_id,
    chatRoomData,
    chatListData,
    publishmentStatusData,
    medicalSpecialities,
    chatRoomList,
    selectedTab,
    setSelectedTab,
    mutateChatRoom,
    mutateChatRoomList,
    mutatePublishmentStatusData,
    mutateChatList,
    fetchNewChatList,
    resetChatListFromUid,
    chatGlobalState,
    accountId,
    isResponderConsult,
    updateMessageMutate,
  } = useChat();
  return (
    <div className="flex h-full bg-white">
      <ConsultList chatRoomList={chatRoomList} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {chat_room_id && chatGlobalState.isSelected ? (
        <ConsultDetail
          publishmentStatusData={publishmentStatusData}
          chatRoomData={chatRoomData}
          medicalSpecialities={medicalSpecialities}
          chatListData={chatListData}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
          mutatePublishmentStatusData={mutatePublishmentStatusData}
          mutateChatList={mutateChatList}
          setSelectedTab={setSelectedTab}
          fetchNewChatList={fetchNewChatList}
          resetChatListFromUid={resetChatListFromUid}
          updateMessageMutate={updateMessageMutate}
        />
      ) : (
        <div className="hidden h-screen flex-grow flex-col border border-[#d5d5d5] bg-bg lg:flex" />
      )}
      <div
        className="hidden h-[calc(100dvh-62px)] w-[316px] flex-shrink-0 flex-grow-0 flex-col justify-between
      lg:flex"
      >
        <div className="block" />
        <div className="flex justify-center overflow-auto">
          {accountId && chat_room_id && isResponderConsult && (
            <HubspotCTA accountId={accountId} chatRoomId={chat_room_id} formId={process.env.HUBSPOT_FORM_ID ?? ''} />
          )}
        </div>
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
