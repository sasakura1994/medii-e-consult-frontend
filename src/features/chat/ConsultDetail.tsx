import React from 'react';
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
  firstUnreadCount: number;
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
    mutateFetchUnreadCounts,
    setSelectedTab,
    firstUnreadCount,
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
    getSpecialityName,
    getExperienceYear,
  } = useConsultDetail({
    medicalSpecialities: medicalSpecialities,
    chatRoomData: chatRoomData,
    chatListData: chatListData,
  });
  return (
    <>
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
                {!isCloseRoom ? (
                  <>
                    <button className="h-9 w-[78px] rounded-full bg-primary">
                      <p className="text-xs text-white">返答依頼</p>
                    </button>
                    <button className="h-9 w-[126px] rounded-full bg-primary">
                      <p className="text-xs text-white">コンサル終了依頼</p>
                    </button>
                    <button className="h-9 w-[78px] rounded-full bg-strong">
                      <p className="text-xs text-white">回答パス</p>
                    </button>
                  </>
                ) : isChatRoomOwner && chatRoomData.chat_room.room_type !== 'GROUP' ? (
                  <button
                    className="h-9 w-[138px] rounded-full bg-primary"
                    onClick={() => setIsOpenReConsultConfirmModal(true)}
                  >
                    <p className="text-xs text-white">他の医師に相談する</p>
                  </button>
                ) : (
                  <></>
                )}
                <img
                  src="/icons/btn_menu.svg"
                  alt=""
                  className="h-9 w-9 cursor-pointer"
                  onClick={() => setIsOpenChatEditModal(true)}
                />
              </div>
              <div className="flex h-5 items-center space-x-1 border">
                {chatRoomData.members[0] && <p className="text-xxs">E-コンサル</p>}
                <p className="text-md font-bold">
                  {chatRoomData.chat_room.room_type === 'GROUP' ? (
                    chatRoomData.members.length + '人の専門医メンバー'
                  ) : chatRoomData.members[0] ? (
                    chatRoomData.members[0].first_name ? (
                      chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + ' 先生'
                    ) : (
                      '質問医'
                    )
                  ) : (
                    <p className="font-normal text-strong">回答してくださる専門医の先生を探しています</p>
                  )}
                </p>
                {chatRoomData.chat_room.room_type !== 'GROUP' && chatRoomData.members[0] && (
                  <p className="text-xs">
                    ({getSpecialityName(chatRoomData.chat_room.target_speciality)}・
                    {getExperienceYear(chatRoomData.members[0].qualified_year)}年目)
                  </p>
                )}
              </div>
            </div>

            <div className="flex-grow overflow-auto bg-bg pb-2" ref={chatListRef}>
              <ChatList
                chatListData={chatListDataWithDisplayName}
                currentUserAccountId={accountId}
                chatRoomData={chatRoomData}
                firstUnreadCount={firstUnreadCount}
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
                mutateFetchUnreadCounts={mutateFetchUnreadCounts}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
