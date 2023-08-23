import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { useToken } from '@/hooks/authentication/useToken';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';

type useConsultDetailProps = {
  medicalSpecialities?: MedicalSpecialityEntity[];
  chatListData?: FetchChatListResponseData;
  chatRoomData?: FetchChatRoomResponseData;
};

export const useConsultDetail = (props: useConsultDetailProps) => {
  const { medicalSpecialities, chatListData, chatRoomData } = props;
  const [isOpenReConsultConfirmModal, setIsOpenReConsultConfirmModal] = useState(false);
  const [isOpenRoomReopenModal, setIsOpenRoomReopenModal] = useState(false);
  const [isOpenChatEditModal, setIsOpenChatEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { accountId } = useToken();
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const getSpecialityName = useCallback(
    (specialityCode: string) => {
      if (chatRoomData && medicalSpecialities) {
        const speciality = medicalSpecialities.find((m) => m.speciality_code === specialityCode);
        return speciality ? speciality.name : '';
      }
    },
    [chatRoomData, medicalSpecialities]
  );

  const getExperienceYear = useCallback((year: number) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const passedYear = currentYear - year;

    return passedYear + 1;
  }, []);

  const chatListDataWithDisplayName = useMemo(() => {
    // TODO: 一旦first_nameがある場合は名前を表示し、ない場合はspecialityとexperienceYearを表示する
    if (chatListData && chatRoomData) {
      return chatListData.map((c) => {
        if (chatRoomData.me?.account_id === c.account_id) {
          if (chatRoomData.me.first_name) {
            return { ...c, displayName: chatRoomData.me.last_name + ' ' + chatRoomData.me.first_name + '先生' };
          } else if (chatRoomData.me.speciality_1) {
            return {
              ...c,
              displayName:
                getSpecialityName(chatRoomData.me.speciality_1) +
                ' ' +
                getExperienceYear(chatRoomData.me.qualified_year) +
                '年目',
            };
          }
          return { ...c, displayName: '' };
        } else if (chatRoomData.members && chatRoomData.members[0].account_id === c.account_id) {
          if (chatRoomData.members[0].first_name) {
            return {
              ...c,
              displayName: chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + '先生',
            };
          } else if (chatRoomData.members[0].speciality_1) {
            return {
              ...c,
              displayName:
                getSpecialityName(chatRoomData.members[0].speciality_1) +
                ' ' +
                getExperienceYear(chatRoomData.members[0].qualified_year) +
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
  }, [chatListData, chatRoomData, getExperienceYear, getSpecialityName]);

  const isCloseRoom = useMemo(() => {
    if (chatRoomData) {
      return chatRoomData.chat_room.status === 'RESOLVED' || chatRoomData.chat_room.status === 'CLOSED';
    }
  }, [chatRoomData]);

  const isChatRoomOwner = useMemo(() => {
    if (chatRoomData) {
      return chatRoomData.chat_room.owner_account_id === accountId;
    }
  }, [chatRoomData, accountId]);

  // チャットリストが更新される度にスクロールを一番下にする
  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chatListData, chatRoomData]);

  return {
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
  };
};
