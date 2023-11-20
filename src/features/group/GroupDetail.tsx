import { isGroupSelectedState } from '@/globalStates/group';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useFetchGetGroup } from '@/hooks/api/group/useFetchGetGroup';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useSetAtom } from 'jotai';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ChatList } from '../chat/ChatList';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { useToken } from '@/hooks/authentication/useToken';
import { ChatTextInput } from '../chat/ChatTextInput';
import { FetchUnreadCountsResponseData } from '@/hooks/api/chat/useFetchUnreadCounts';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { KeyedMutator } from 'swr';
import { GroupMemberModal } from './GroupMemberModal';
import { NotificationFrequencySettingModal } from './NotificationFrequencySettingModal';

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
  //   const { chatRoomData, medicalSpecialities, chatListData, mutateChatRoom, mutateChatRoomList, mutateChatList } = props;
  const { chatRoomData, chatListData, mutateChatRoom, mutateChatList } = props;
  const [isOpenGroupMemberModal, setIsOpenGroupMemberModal] = useState(false);
  const [isShowNotificationFrequencySettingModal, setIsShowNotificationFrequencySettingModal] = useState(true);
  const [, setIsOpenChatEditModal] = useState(false);
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const setIsGroupSelected = useSetAtom(isGroupSelectedState);
  const { accountId } = useToken();
  const [, setSelectedImage] = useState<string>('');
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { group } = useFetchGetGroup(chatRoomData?.chat_room.group_id ?? undefined);
  const getExperienceYear = useCallback((year: number) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const passedYear = currentYear - year;

    return passedYear + 1;
  }, []);

  const isShowNotificationFrequencySetting = useMemo(() => {
    if (group && !group.is_notification_frequency_initialized) {
      return true;
    }
    return false;
  }, [group]);

  const groupMember = useMemo(() => {
    if (chatRoomData && chatRoomData.members && chatRoomData.me) {
      const members = chatRoomData.members;
      // 一致するメンバーがいない場合だけpushする
      if (!members.some((member) => member.account_id === chatRoomData.me?.account_id)) {
        members.push(chatRoomData.me);
      }
      return members;
    }
    return [];
  }, [chatRoomData]);

  const chatListDataWithDisplayName = useMemo(() => {
    if (chatListData && chatRoomData) {
      return chatListData.map((c) => {
        // 自分の場合
        if (chatRoomData.me?.account_id === c.account_id) {
          if (chatRoomData.me.first_name) {
            return { ...c, displayName: chatRoomData.me.last_name + ' ' + chatRoomData.me.first_name + '先生' };
            // TODO: 以下の部分が不要かもしれない
          } else if (chatRoomData.me.speciality_1) {
            return {
              ...c,
              displayName:
                getMedicalSpecialityName(chatRoomData.me.speciality_1) +
                ' ' +
                getExperienceYear(chatRoomData.me.qualified_year) +
                '年目',
            };
          }
          return { ...c, displayName: '' };
          // 自分以外の場合
        } else if (
          chatRoomData.members &&
          chatRoomData.members.length > 0 &&
          chatRoomData.members.some((member) => member.account_id === c.account_id)
        ) {
          const targetMember = chatRoomData.members.find((member) => c.account_id === member.account_id);
          if (targetMember?.first_name) {
            return {
              ...c,
              displayName: targetMember.last_name + ' ' + targetMember.first_name + '先生',
            };
            // TODO: 以下の部分が不要かもしれない
          } else if (targetMember?.speciality_1) {
            return {
              ...c,
              displayName:
                getMedicalSpecialityName(targetMember.speciality_1) +
                ' ' +
                getExperienceYear(targetMember.qualified_year) +
                '年目',
            };
          }
          return { ...c, displayName: '' };
        } else if (c.account_id === 'CHATBOT') {
          return {
            ...c,
            displayName: 'システム通知',
          };
        }
        return { ...c, displayName: '' };
      });
    }
  }, [chatListData, chatRoomData, getExperienceYear, getMedicalSpecialityName]);
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
  }, [group]);

  return (
    <>
      {isShowNotificationFrequencySetting && isShowNotificationFrequencySettingModal && group && (
        <NotificationFrequencySettingModal setShowModal={setIsShowNotificationFrequencySettingModal} group={group} />
      )}
      {isOpenGroupMemberModal && chatRoomData && (
        <GroupMemberModal setIsOpen={setIsOpenGroupMemberModal} members={groupMember} />
      )}
      {chatRoomData && (
        <div
          className="flex h-full flex-grow flex-col overflow-hidden border border-[#d5d5d5]
          lg:h-[calc(100vh-62px)]"
        >
          <div className="flex-shrink-0 flex-grow-0">
            <div className="mb-2 mr-2 items-center space-x-1 lg:flex lg:h-14">
              <div className="line-clamp-1 flex items-center lg:flex-grow">
                <img
                  src="icons/arrow_left.svg"
                  alt=""
                  className="ml-3 mt-4 block h-5 w-5 lg:hidden"
                  onClick={() => setIsGroupSelected(false)}
                />
                <div className="mt-2 flex flex-wrap lg:mt-0 lg:flex-none">
                  <div className="block h-0 w-full lg:hidden" />
                  <p className="ml-4 mr-2 line-clamp-1 flex-grow font-bold lg:ml-2">{group?.group_name}</p>
                </div>
              </div>
              <img
                src="icons/btn_menu.svg"
                alt=""
                className="hidden h-9 w-9 cursor-pointer lg:block"
                onClick={() => setIsOpenChatEditModal(true)}
              />
            </div>
            <div className="flex flex-wrap items-center space-x-1 border-t lg:h-7 lg:border-b">
              <div className="block h-0 w-full lg:hidden" />
              <div className="flex flex-grow items-center lg:flex-grow-0">{chatRoomDisplayName}</div>

              <img
                src="icons/btn_menu.svg"
                alt=""
                className="block h-9 w-9 lg:hidden"
                onClick={() => setIsOpenChatEditModal(true)}
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
