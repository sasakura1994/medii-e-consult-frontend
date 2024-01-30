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
import { ConsultDeleteModal } from './ConsultDeleteModal';
import { FetchUnreadCountsResponseData } from '@/hooks/api/chat/useFetchUnreadCounts';
import { ChatDoctorDetailModal } from './ChatDoctorDetailModal';
import { OpenConsultDetailButton } from './OpenConsultDetailButton';
import { ChatGroupMemberModal } from './ChatGroupMemberModal';
import { ChatReplyRequestModal } from './ChatReplyRequestModal';
import { ChatTempResolveRequestModal } from './ChatTempResolveRequestModal';
import { CloseChatRoomModal } from './CloseChatRoomModal';
import { ResolveChatRoomModal } from './ResolveChatRoomModal';
import ChatImageModal from './ChatImageModal';
import { AllowAddToConsultExampleListModal } from './AllowAddToConsultExampleListModal';
import { ReConsultSuggestionModal } from './ReConsultSuggestionModal';
import { useDoctor } from '@/hooks/useDoctor';

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
  mutatePublishmentStatusData?: KeyedMutator<{
    publishment_accepted: number;
  }>;
  setSelectedTab: React.Dispatch<React.SetStateAction<'open' | 'close'>>;
  fetchNewChatList: (uid: number) => void;
  resetChatListFromUid: () => void;
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
    mutatePublishmentStatusData,
    setSelectedTab,
    fetchNewChatList,
    resetChatListFromUid,
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
    isOpenReConsultSuggestionModal,
    setIsOpenReConsultSuggestionModal,
    isOpenAnnounce,
    setIsOpenAnnounce,
    isViewingAnnounce,
    selectedImage,
    setSelectedImage,
    setChatGlobalState,
    getMedicalSpecialityName,
    activateChatRoom,
  } = useConsultDetail({
    medicalSpecialities: medicalSpecialities,
    chatRoomData: chatRoomData,
    chatListData: chatListData,
    fetchNewChatList: fetchNewChatList,
  });
  const { calculateExperienceYear } = useDoctor();

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
    const owner = chatRoomData.members.find((member) => member.account_id === chatRoomData.chat_room.owner_account_id);
    if (!isMyRoom) {
      if (!owner?.speciality_1) {
        // プロフィール未入力ユーザー
        return <p className="text-md font-bold">質問医</p>;
      }
      if (chatRoomData.chat_room.is_real_name) {
        return (
          <>
            <p className="text-md font-bold">{owner?.last_name + ' ' + owner?.first_name + '先生'}</p>
            <p className="text-xs">
              ({getMedicalSpecialityName(owner?.speciality_1 ?? '')}・
              {calculateExperienceYear(owner?.qualified_year ?? 0)}
              年目)
            </p>
          </>
        );
      }
      return (
        <>
          <p className="text-md font-bold">質問医</p>
          {chatRoomData.members.length > 0 && (
            <p className="text-xs" data-testid="chat-room-display-name-speciality-and-year">
              ({getMedicalSpecialityName(owner?.speciality_1 ?? '')}・
              {calculateExperienceYear(owner?.qualified_year ?? 0)}
              年目)
            </p>
          )}
        </>
      );
    }
    if (chatRoomData.chat_room.status === 'CREATED') {
      return <p className="text-sm font-normal text-strong">回答してくださる専門医の先生を探しています</p>;
    }
    if (chatRoomData.chat_room.status === 'PENDING') {
      return (
        <p className="text-sm font-normal text-strong">
          現在、コンサルの内容を確認しています。情報の追記などをお願いする場合がございます。
        </p>
      );
    }
    if (chatRoomData.members.length === 0) {
      return <p className="text-sm font-bold">退会済みアカウント</p>;
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
              ({getMedicalSpecialityName(owner.speciality_1)}・{calculateExperienceYear(owner.qualified_year)}
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
          {calculateExperienceYear(chatRoomData.members[0].qualified_year)}年目)
        </p>
      </>
    );
  }, [
    chatRoomData,
    calculateExperienceYear,
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
        <ResolveChatRoomModal
          setIsOpen={setIsOpenResolveChatRoomModal}
          setIsOpenReConsultConfirmModal={setIsOpenReConsultConfirmModal}
          chatRoomData={chatRoomData}
          setSelectedTab={setSelectedTab}
          mutateChatRoom={mutateChatRoom}
        />
      )}
      {selectedImage && (
        <ChatImageModal
          url={selectedImage}
          onClose={() => {
            setSelectedImage('');
          }}
        />
      )}
      {publishmentStatusData && publishmentStatusData.publishment_accepted === null && chatRoomData && (
        <AllowAddToConsultExampleListModal
          chatRoomId={chatRoomData.chat_room.chat_room_id}
          mutatePublishmentStatusData={mutatePublishmentStatusData}
        />
      )}
      {chatRoomData && accountId && chatListDataWithDisplayName && (
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
            <ConsultDeleteModal
              chatRoomData={chatRoomData}
              setIsOpenDeleteModal={setIsOpenDeleteModal}
              mutateChatRoomList={mutateChatRoomList}
            />
          )}
          {isOpenReConsultSuggestionModal && (
            <ReConsultSuggestionModal
              chatRoomID={chatRoomData.chat_room.chat_room_id}
              setIsOpenReConsultSuggestionModal={setIsOpenReConsultSuggestionModal}
            />
          )}

          <div
            className="flex h-full flex-grow flex-col overflow-hidden border border-[#d5d5d5]
          lg:h-[calc(100dvh-62px)]"
          >
            <div className="flex-shrink-0 flex-grow-0">
              <div className="mr-2 items-center space-x-1 lg:flex lg:h-14">
                <div className="line-clamp-1 flex items-center lg:flex-grow">
                  <img
                    src="icons/arrow_left.svg"
                    alt=""
                    className="ml-3 mt-4 block h-5 w-5 lg:hidden"
                    onClick={() => setChatGlobalState((prev) => ({ ...prev, isSelected: false }))}
                  />
                  <div className="mt-2 flex flex-wrap lg:mt-0 lg:flex-none">
                    {isCloseRoom ? (
                      <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-[#64abc4]">
                        <p className="py-0.5 text-xs text-white">解決済</p>
                      </div>
                    ) : (
                      <div className="ml-4 flex w-[53px] items-center justify-center rounded-full bg-strong">
                        <p className="py-0.5 text-xs text-white">未解決</p>
                      </div>
                    )}
                    <div className="block h-0 w-full lg:hidden" />
                    <p className="ml-4 mr-2 line-clamp-1 flex-grow font-bold lg:ml-2">{chatRoomData.chat_room.title}</p>
                  </div>
                </div>

                <div className="hidden space-x-1 lg:flex">
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
                </div>
                <img
                  src="icons/btn_menu.svg"
                  alt=""
                  className="hidden h-9 w-9 cursor-pointer lg:block"
                  onClick={() => setIsOpenChatEditModal(true)}
                />
              </div>
              <div className="flex flex-wrap items-center space-x-1 border-t lg:h-7 lg:border-b">
                {chatRoomData.members[0] && <p className="-mb-2 mt-2 text-xxs lg:mt-0 lg:border-t-0">E-コンサル</p>}
                <div className="block h-0 w-full lg:hidden" />
                <div className="flex flex-grow items-center lg:flex-grow-0">{chatRoomDisplayName}</div>

                <img
                  src="icons/btn_menu.svg"
                  alt=""
                  className="block h-9 w-9 lg:hidden"
                  onClick={() => setIsOpenChatEditModal(true)}
                />
              </div>
              <div className="flex space-x-1 border-b pb-1 lg:hidden">
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
              </div>
            </div>
            {isViewingAnnounce && (
              <>
                <div className={`${isOpenAnnounce ? 'border-none' : 'border-b'}`}>
                  <div className={`${isOpenAnnounce ? 'm-4 mb-[10px]' : 'm-4 '} flex items-center`}>
                    <img src="icons/exclamation-triangle-blue.svg" alt="" className="mr-2" />
                    <p className="flex-grow text-base font-bold text-text-primary">先生方へのお願い</p>
                    {!isOpenAnnounce && (
                      <div
                        className="flex cursor-pointer items-center gap-0.5"
                        onClick={() => {
                          setIsOpenAnnounce(true);
                        }}
                      >
                        <p className="whitespace-nowrap text-sm text-medii-blue-base">詳細を見る</p>
                        <img src="icons/caret.svg" alt="" className="rotate-180" />
                      </div>
                    )}
                  </div>
                </div>
                {isOpenAnnounce && (
                  <div className="border-b">
                    <div className="m-4 mt-0">
                      <div className="text-base text-text-primary">
                        <p>
                          E-コンサルは温かいボランティア精神で成り立っています。
                          <br />
                          解決しましたら、感謝の気持ちをお伝えください。
                          回答された先生にMediiから謝礼をお渡しするため、解決後には解決ボタンを押していただきますようお願いいたします。
                        </p>
                      </div>
                      <div
                        className="mt-[10px] flex cursor-pointer items-center justify-center gap-0.5"
                        onClick={() => {
                          setIsOpenAnnounce(false);
                        }}
                      >
                        <p className="text-sm text-medii-blue-base">閉じる</p>
                        <img src="icons/caret.svg" alt="" />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            {isCloseRoom ? (
              <div className="relative flex flex-grow overflow-hidden">
                <div className="flex-grow overflow-y-auto overscroll-none bg-bg" ref={chatListRef}>
                  <ChatList
                    chatListData={chatListDataWithDisplayName}
                    currentUserAccountId={accountId}
                    chatRoomData={chatRoomData}
                    setSelectedImage={setSelectedImage}
                    mutateChatList={mutateChatList}
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black bg-opacity-20" />
              </div>
            ) : (
              <div className="flex-shrink flex-grow overflow-y-auto overscroll-none bg-bg pb-2" ref={chatListRef}>
                <ChatList
                  chatListData={chatListDataWithDisplayName}
                  currentUserAccountId={accountId}
                  chatRoomData={chatRoomData}
                  setSelectedImage={setSelectedImage}
                  mutateChatList={mutateChatList}
                />
              </div>
            )}
            {isCloseRoom && (
              <div className="pointer-events-auto bg-[#5c6bc0] p-2 text-center text-sm text-white">
                <p>解決済みのルームです</p>
                <div className="flex flex-col justify-center lg:flex-row">
                  {chatRoomData.members.length > 0 ? (
                    <div
                      className="mx-3 mt-4 min-w-[40%] cursor-pointer rounded-full bg-white px-4 py-1 text-primary"
                      onClick={() => setIsOpenRoomReopenModal(true)}
                    >
                      <p className="text-sm">このコンサルを再開する</p>
                    </div>
                  ) : (
                    <div
                      className="mx-3 mt-4 min-w-[40%] cursor-not-allowed rounded-full bg-btn-hover-gray
                     px-4 py-1 text-primary"
                    >
                      <p className="text-sm">このコンサルを再開する</p>
                    </div>
                  )}
                  {isChatRoomOwner &&
                    (chatRoomData.chat_room.room_type === 'GROUP' ? (
                      <Link
                        href={{
                          pathname: 'newchatroom',
                          query: `target_group_id=${chatRoomData.chat_room.group_id}`,
                        }}
                        className="mx-3 mt-4 min-w-[40%] cursor-pointer rounded-full bg-white px-4 py-1 text-primary"
                      >
                        <p className="text-sm">同じ医師グループに別の症例を相談する</p>
                      </Link>
                    ) : chatRoomData.members.length > 0 ? (
                      <Link
                        href={{
                          pathname: 'newchatroom',
                          query: `target_account_id=${chatRoomData.members[0].account_id}`,
                        }}
                        className="mx-3 mt-4 min-w-[40%] cursor-pointer rounded-full bg-white px-4 py-1 text-primary"
                      >
                        <p className="text-sm">同じ医師に別の症例を相談する</p>
                      </Link>
                    ) : (
                      <div
                        className="mx-3 mt-4 min-w-[40%] cursor-not-allowed rounded-full
                       bg-btn-hover-gray px-4 py-1 text-primary"
                      >
                        <p className="text-sm">同じ医師に別の症例を相談する</p>
                      </div>
                    ))}
                </div>
              </div>
            )}
            {chatRoomData.chat_room.status === 'TEMP_RESOLVED' && isChatRoomOwner && (
              <div className="pointer-events-auto bg-[#5c6bc0] p-2 text-center text-sm text-white">
                <p>専門医よりコンサル終了の依頼が届きました</p>
                <div className="flex justify-center">
                  <div
                    className="mx-3 mt-4 min-w-[40%] cursor-pointer rounded-full bg-white px-4 py-1 text-primary"
                    onClick={async () => {
                      await activateChatRoom({ chat_room_id: chatRoomData.chat_room.chat_room_id });
                      await mutateChatRoom?.();
                      mutateChatList?.();
                    }}
                  >
                    <p className="text-sm">コンサルを継続</p>
                  </div>
                  <div
                    className="mx-3 mt-4 min-w-[40%] cursor-pointer
                      rounded-full bg-white px-4 py-1 text-primary"
                    onClick={() => setIsOpenResolveChatRoomModal(true)}
                  >
                    <p className="text-sm">解決しました</p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex-shrink-0 flex-grow-0">
              <ChatTextInput
                chatRoomId={chatRoomData.chat_room.chat_room_id}
                mutateChatList={mutateChatList}
                mutateChatRoom={mutateChatRoom}
                resetChatListFromUid={resetChatListFromUid}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
