import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import React, { useMemo } from 'react';
import { ChatList } from '../chat/ChatList';
import { ChatTextInput } from '../chat/ChatTextInput';
import { FetchUnreadCountsResponseData } from '@/hooks/api/chat/useFetchUnreadCounts';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { KeyedMutator } from 'swr';
import { GroupMemberModal } from './GroupMemberModal';
import { NotificationFrequencySettingModal } from './NotificationFrequencySettingModal';
import { GroupEditModal } from './GroupEditModal';
import { LeaveGroupConfirmModal } from './LeaveGroupConfirmModal';
import { useGroupDetail } from './useGroupDetail';
import ChatImageModal from '../chat/ChatImageModal';

type ConsultDetailProps = {
  chatRoomData?: FetchChatRoomResponseData;
  medicalSpecialities?: MedicalSpecialityEntity[];
  chatListData?: FetchChatListResponseData;
  mutateChatRoom?: KeyedMutator<FetchChatRoomResponseData>;
  mutateChatRoomList?: KeyedMutator<ChatRoomEntity[]>;
  mutateChatList?: KeyedMutator<FetchChatListResponseData>;
  mutateFetchUnreadCounts?: KeyedMutator<FetchUnreadCountsResponseData>;
};

export const GroupDetail = (props: ConsultDetailProps) => {
  const { chatRoomData, chatListData, mutateChatRoom, mutateChatRoomList, mutateChatList } = props;
  const {
    group,
    setIsOpenGroupMemberModal,
    isLeaveGroupConfirmModal,
    setIsLeaveGroupConfirmModal,
    accountId,
    isOpenGroupEditModal,
    setIsOpenGroupEditModal,
    isShowNotificationFrequencySettingModal,
    isShowNotificationFrequencySetting,
    setIsShowNotificationFrequencySettingModal,
    isOpenGroupMemberModal,
    groupMember,
    setIsGroupSelected,
    selectedImage,
    setSelectedImage,
    chatListRef,
  } = useGroupDetail({
    chatRoomData,
  });
  const groupDisplayTitle = useMemo(() => {
    if (!group) {
      return <></>;
    }
    if (group.disease) {
      return (
        <p className="mb-2 ml-6 text-sm text-[#635e5e]">
          {group.area + '_' + group.disease + '(' + group.speciality_name + ')'}
        </p>
      );
    }
    return <p className="mb-2 ml-6 text-sm text-[#635e5e]">{group.area + '(' + group.speciality_name + ')'}</p>;
  }, [group]);

  const chatListDataWithDisplayName = useMemo(() => {
    if (chatListData && chatRoomData) {
      return chatListData.map((c) => {
        // 自分の場合
        if (chatRoomData.me?.account_id === c.account_id) {
          return { ...c, displayName: chatRoomData.me.last_name + ' ' + chatRoomData.me.first_name + '先生' };

          // 自分以外の場合
        } else if (
          chatRoomData.members &&
          chatRoomData.members.length > 0 &&
          chatRoomData.members.some((member) => member.account_id === c.account_id)
        ) {
          const targetMember = chatRoomData.members.find((member) => c.account_id === member.account_id);
          return {
            ...c,
            displayName: targetMember?.last_name + ' ' + targetMember?.first_name + '先生',
          };
        } else if (c.account_id === 'CHATBOT') {
          return {
            ...c,
            displayName: 'システム通知',
          };
        }
        return { ...c, displayName: '' };
      });
    }
  }, [chatListData, chatRoomData]);
  const chatRoomDisplayName = useMemo(() => {
    if (!group) {
      return <></>;
    }
    return (
      <p
        className="ml-2 cursor-pointer text-sm font-bold text-text-link underline"
        onClick={() => setIsOpenGroupMemberModal(true)}
      >
        {group.member_ids.length}人のグループメンバー
      </p>
    );
  }, [group, setIsOpenGroupMemberModal]);

  return (
    <>
      {isLeaveGroupConfirmModal && accountId && group && (
        <LeaveGroupConfirmModal
          setIsOpen={setIsLeaveGroupConfirmModal}
          group={group}
          accountId={accountId}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
        />
      )}
      {isOpenGroupEditModal && group && mutateChatRoom && mutateChatRoomList && (
        <GroupEditModal
          group={group}
          setIsOpen={setIsOpenGroupEditModal}
          mutateChatRoom={mutateChatRoom}
          mutateChatRoomList={mutateChatRoomList}
          setIsLeaveGroupConfirmModal={setIsLeaveGroupConfirmModal}
        />
      )}
      {isShowNotificationFrequencySetting && isShowNotificationFrequencySettingModal && group && (
        <NotificationFrequencySettingModal setShowModal={setIsShowNotificationFrequencySettingModal} group={group} />
      )}
      {isOpenGroupMemberModal && group && chatRoomData && (
        <GroupMemberModal
          setIsOpen={setIsOpenGroupMemberModal}
          members={groupMember}
          group={group}
          setIsOpenGroupEditModal={setIsOpenGroupEditModal}
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
      {chatRoomData && (
        <div
          className="flex h-full flex-grow flex-col overflow-hidden border border-[#d5d5d5]
          lg:h-[calc(100vh-62px)]"
        >
          <div className="mt-2 flex-shrink-0 flex-grow-0">
            <div className="mr-2 items-center space-x-1 lg:flex">
              <div className="line-clamp-1 flex items-center lg:flex-grow">
                <img
                  src="icons/arrow_left.svg"
                  alt=""
                  className="ml-3 mt-4 block h-5 w-5 lg:hidden"
                  onClick={() => setIsGroupSelected(false)}
                />
                <div className="mt-2 flex flex-col flex-wrap lg:mt-0">
                  <div className="block h-0 w-full lg:hidden" />
                  <p className="ml-4 mr-2 line-clamp-1 flex-grow font-bold lg:ml-2">【{group?.group_name}】</p>
                  {groupDisplayTitle}
                </div>
              </div>
              <img
                src="icons/btn_menu.svg"
                alt=""
                className="hidden h-9 w-9 cursor-pointer lg:block"
                onClick={() => setIsOpenGroupEditModal(true)}
              />
            </div>

            <div className="flex flex-wrap items-center space-x-1 border-t lg:h-7 lg:border-b">
              <div className="block h-0 w-full lg:hidden" />
              <div className="flex flex-grow items-center lg:flex-grow-0">{chatRoomDisplayName}</div>

              <img
                src="icons/btn_menu.svg"
                alt=""
                className="block h-9 w-9 lg:hidden"
                onClick={() => setIsOpenGroupEditModal(true)}
              />
            </div>
          </div>
          {chatListDataWithDisplayName && accountId && (
            <div className="flex-shrink flex-grow overflow-auto bg-[#eff6f2] pb-2" ref={chatListRef}>
              <ChatList
                isGroup
                chatListData={chatListDataWithDisplayName}
                currentUserAccountId={accountId}
                chatRoomData={chatRoomData}
                setSelectedImage={setSelectedImage}
                mutateChatList={mutateChatList}
              />
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
      )}
    </>
  );
};
