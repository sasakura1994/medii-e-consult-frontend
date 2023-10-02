import React, { useMemo } from 'react';
import { ChatList } from './ChatList';
import { ChatTextInput } from './ChatTextInput';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import Link from 'next/link';
import { ReConsultConfirmModal } from './ReConsultConfirmModal';
import { RoomReopenModal } from './RoomReopenModal';
import { KeyedMutator } from 'swr';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { useConsultDetail } from './useConsultDetail';
import { ChatEditModal } from './ChatEditModal';
import { ChatDeleteModal } from './ChatDeleteModal';
import { FetchUnreadCountsResponseData } from '@/hooks/api/chat/useFetchUnreadCounts';
import { ChatDoctorDetailModal } from './ChatDoctorDetailModal';
import { OpenConsultDetailButton } from './OpenConsultDetailButton';
import { ChatGroupMemberModal } from './ChatGroupMemberModal';
import { ChatReplyRequestModal } from './ChatReplyRequestModal';
import { ChatTempResolveRequestModal } from './ChatTempResolveRequestModal';
import { CloseChatRoomModal } from './CloseChatRoomModal';
import { ResolveChatRoomModal } from './ResolveChatRoomModal';

type ConsultDetailProps = {
  publishmentStatusData?: {
    publishment_accepted: number;
  };
  chatRoomData?: FetchChatRoomResponseData;
  medicalSpecialities?: MedicalSpecialityEntity[];
  chatListData?: FetchChatListResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
  mutateChatList?: KeyedMutator<FetchChatListResponseData>;
  mutateFetchUnreadCounts?: KeyedMutator<FetchUnreadCountsResponseData>;
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
};

export const ConsultDetail = (props: ConsultDetailProps) => {
  const {
    publishmentStatusData,
    chatRoomData,
    medicalSpecialities,
    chatListData,
    mutateChatRoom,
    mutateChatRoomList,
    mutateChatList,
    setSelectedTab,
  } = props;
  const {
    accountId,
    chatListRef,
    chatListDataWithDisplayName,
    isCloseRoom,
    isChatRoomOwner,
    isOpenReConsultConfirmModal,
    setIsOpenReConsultConfirmModal,
    isOpenRoomReopenModal,
    setIsOpenRoomReopenModal,
    isOpenChatEditModal,
    setIsOpenChatEditModal,
    isOpenDeleteModal,
    setIsOpenDeleteModal,
    isOpenDoctorDetailModal,
    setIsOpenDoctorDetailModal,
    isOpenGroupMemberModal,
    setIsOpenGroupMemberModal,
    isOpenReplyRequestModal,
    setIsOpenReplyRequestModal,
    isOpenTempResolveRequestModal,
    setIsOpenTempResolveRequestModal,
    isOpenCloseChatRoomModal,
    setIsOpenCloseChatRoomModal,
    isOpenResolveChatRoomModal,
    setIsOpenResolveChatRoomModal,
    getMedicalSpecialityName,
    getExperienceYear,
  } = useConsultDetail({
    medicalSpecialities: medicalSpecialities,
    chatRoomData: chatRoomData,
    chatListData: chatListData,
  });

  const isMyRoom = useMemo(() => {
    if (chatRoomData && accountId) {
      return chatRoomData.chat_room.owner_account_id === accountId;
    }
    return false;
  }, [chatRoomData, accountId]);

  const chatRoomDisplayName = useMemo(() => {
    if (!chatRoomData) {
      return <></>;
    }

    if (!isMyRoom) {
      if (chatRoomData.chat_room.is_real_name) {
        const owner = chatRoomData.members.find(
          (member) => member.account_id === chatRoomData.chat_room.owner_account_id
        );
        if (owner) {
          return (
            <>
              <p className="text-md font-bold">{owner.last_name + ' ' + owner.first_name + '先生'}</p>
              <p className="text-xs">
                ({getMedicalSpecialityName(owner.speciality_1)}・{getExperienceYear(owner.qualified_year)}年目)
              </p>
            </>
          );
        }
      }
      return (
        <>
          <p className="text-md font-bold">質問医</p>
          <p className="text-xs">
            ({getMedicalSpecialityName(chatRoomData.members[0].speciality_1)}・
            {getExperienceYear(chatRoomData.members[0].qualified_year)}年目)
          </p>
        </>
      );
    }

    if (chatRoomData.members.length === 0) {
      return <p className="text-sm font-normal text-strong">回答してくださる専門医の先生を探しています</p>;
    }

    // 実名グループの場合
    if (
      chatRoomData.chat_room &&
      !isMyRoom &&
      chatRoomData.chat_room.room_type === 'GROUP' &&
      chatRoomData.chat_room.is_real_name
    ) {
      const owner = chatRoomData.members.find(
        (member) => member.account_id === chatRoomData.chat_room.owner_account_id
      );
      if (owner) {
        return (
          <>
            <p className="cursor-pointer text-md font-bold underline" onClick={() => setIsOpenDoctorDetailModal(true)}>
              {owner.last_name + ' ' + owner.first_name + '先生'}
            </p>
            <p className="text-xs">
              ({getMedicalSpecialityName(owner.speciality_1)}・{getExperienceYear(owner.qualified_year)}
              年目)
            </p>
          </>
        );
      }
    }

    if (chatRoomData.chat_room.room_type === 'GROUP') {
      return (
        <p className="cursor-pointer text-md font-bold underline" onClick={() => setIsOpenGroupMemberModal(true)}>
          {chatRoomData.members.length}人の専門医メンバー
        </p>
      );
    }

    return (
      <>
        <p className="cursor-pointer text-md font-bold underline" onClick={() => setIsOpenDoctorDetailModal(true)}>
          {chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + ' 先生'}
        </p>
        <p className="text-xs">
          ({getMedicalSpecialityName(chatRoomData.members[0].speciality_1)}・
          {getExperienceYear(chatRoomData.members[0].qualified_year)}年目)
        </p>
      </>
    );
  }, [
    chatRoomData,
    getExperienceYear,
    getMedicalSpecialityName,
    isMyRoom,
    setIsOpenDoctorDetailModal,
    setIsOpenGroupMemberModal,
  ]);

  return (
    <>
      {isOpenDoctorDetailModal && chatRoomData && (
        <ChatDoctorDetailModal setIsOpen={setIsOpenDoctorDetailModal} member={chatRoomData.members[0]} />
      )}
      {chatRoomData && isOpenGroupMemberModal && (
        <ChatGroupMemberModal setIsOpen={setIsOpenGroupMemberModal} members={chatRoomData.members} />
      )}
      {chatRoomData && isOpenReplyRequestModal && (
        <ChatReplyRequestModal setIsOpen={setIsOpenReplyRequestModal} chatRoomData={chatRoomData} />
      )}
      {chatRoomData && isOpenTempResolveRequestModal && (
        <ChatTempResolveRequestModal
          setIsOpen={setIsOpenTempResolveRequestModal}
          chatRoomData={chatRoomData}
          mutateChatRoom={mutateChatRoom}
        />
      )}
      {chatRoomData && isOpenCloseChatRoomModal && (
        <CloseChatRoomModal
          setIsOpen={setIsOpenCloseChatRoomModal}
          chatRoomData={chatRoomData}
          mutateChatRoom={mutateChatRoom}
        />
      )}
      {chatRoomData && isOpenResolveChatRoomModal && (
        <ResolveChatRoomModal setIsOpen={setIsOpenResolveChatRoomModal} chatRoomData={chatRoomData} />
      )}
      {chatRoomData && publishmentStatusData && accountId && chatListDataWithDisplayName && (
        <>
          {isOpenReConsultConfirmModal && (
            <ReConsultConfirmModal
              chatRoomID={chatRoomData.chat_room.chat_room_id}
              setIsOpenReConsultConfirmModal={setIsOpenReConsultConfirmModal}
            />
          )}
          {isOpenRoomReopenModal && mutateChatRoom && mutateChatRoomList && (
            <RoomReopenModal
              chatRoomID={chatRoomData.chat_room.chat_room_id}
              isChatRoomOwner={isChatRoomOwner}
              setIsOpenRoomReopenModal={setIsOpenRoomReopenModal}
              mutateChatRoom={mutateChatRoom}
              mutateChatRoomList={mutateChatRoomList}
              setSelectedTab={setSelectedTab}
            />
          )}
          {isOpenChatEditModal && (
            <ChatEditModal
              chatRoomData={chatRoomData}
              setIsOpenChatEditModal={setIsOpenChatEditModal}
              setIsOpenDeleteModal={setIsOpenDeleteModal}
              accountID={accountId}
              mutateChatRoom={mutateChatRoom}
              mutateChatRoomList={mutateChatRoomList}
            />
          )}

          {isOpenDeleteModal && (
            <ChatDeleteModal
              chatRoomData={chatRoomData}
              setIsOpenDeleteModal={setIsOpenDeleteModal}
              mutateChatRoom={mutateChatRoom}
              mutateChatRoomList={mutateChatRoomList}
            />
          )}
          <div className="flex h-[calc(100vh-62px)] w-[787px] flex-col border border-[#d5d5d5]">
            <div className="flex-shrink-0 flex-grow-0">
              <div className="mr-2 flex h-14 items-center space-x-1">
                {isCloseRoom ? (
                  <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-[#64abc4]">
                    <p className="py-0.5 text-xs text-white">解決済</p>
                  </div>
                ) : (
                  <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-strong">
                    <p className="py-0.5 text-xs text-white">未解決</p>
                  </div>
                )}
                <p className="ml-2 flex-grow font-bold">{chatRoomData.chat_room.title}</p>

                <OpenConsultDetailButton
                  isCloseRoom={isCloseRoom}
                  isChatRoomOwner={isChatRoomOwner}
                  chatRoomData={chatRoomData}
                  setIsOpenReConsultConfirmModal={setIsOpenReConsultConfirmModal}
                  setIsOpenReplyRequestModal={setIsOpenReplyRequestModal}
                  setIsOpenTempResolveRequestModal={setIsOpenTempResolveRequestModal}
                  setIsOpenCloseChatRoomModal={setIsOpenCloseChatRoomModal}
                  setIsOpenResolveChatRoomModal={setIsOpenResolveChatRoomModal}
                />

                <img
                  src="/icons/btn_menu.svg"
                  alt=""
                  className="h-9 w-9 cursor-pointer"
                  onClick={() => setIsOpenChatEditModal(true)}
                />
              </div>
              <div className="flex h-5 items-center space-x-1 border">
                {chatRoomData.members[0] && <p className="text-xxs">E-コンサル</p>}
                {chatRoomDisplayName}
              </div>
            </div>

            <div className="flex-grow overflow-auto bg-bg pb-2" ref={chatListRef}>
              <ChatList
                chatListData={chatListDataWithDisplayName}
                currentUserAccountId={accountId}
                chatRoomData={chatRoomData}
              />
            </div>
            {isCloseRoom && (
              <div className="pointer-events-auto bg-[#5c6bc0] p-2 text-center text-sm text-white">
                <p>解決済みのルームです</p>
                <div className="flex justify-center">
                  <div
                    className="mx-3 mt-4 min-w-[40%] cursor-pointer rounded-full bg-white px-4 py-1 text-primary"
                    onClick={() => setIsOpenRoomReopenModal(true)}
                  >
                    <p className="text-sm">このコンサルを再開する</p>
                  </div>
                  {isChatRoomOwner &&
                    (chatRoomData.chat_room.room_type === 'GROUP' ? (
                      <Link
                        href={{
                          pathname: 'newchatroom',
                          query: `target_group_id=${chatRoomData.chat_room.group_id}`,
                        }}
                      >
                        <div
                          className="mx-3 mt-4 min-w-[40%] cursor-pointer
                       rounded-full bg-white px-4 py-1 text-primary"
                        >
                          <p className="text-sm">同じ医師グループに別の症例を相談する</p>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        href={{
                          pathname: 'newchatroom',
                          query: `target_account_id=${chatRoomData.members[0].account_id}`,
                        }}
                      >
                        <div
                          className="mx-3 mt-4 min-w-[40%] cursor-pointer
                      rounded-full bg-white px-4 py-1 text-primary"
                        >
                          <p className="text-sm">同じ医師に別の症例を相談する</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
            <div className="flex-shrink-0 flex-grow-0">
              <ChatTextInput
                chatRoomId={chatRoomData.chat_room.chat_room_id}
                mutateChatList={mutateChatList}
                mutateChatRoom={mutateChatRoom}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
