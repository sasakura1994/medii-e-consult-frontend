import { isChatRoomSelectedState } from '@/globalStates/chat';
import { FetchChatListResponseData } from '@/hooks/api/chat/useFetchChatList';
import { FetchChatRoomResponseData } from '@/hooks/api/chat/useFetchChatRoom';
import { usePostActivateChatRoom } from '@/hooks/api/chat/usePostActivateChatRoom';
import { useToken } from '@/hooks/authentication/useToken';
import { useMedicalSpeciality } from '@/hooks/medicalSpeciality/useMedicalSpeciality';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useSetAtom } from 'jotai';
import { useState, useRef, useCallback, useMemo, useEffect } from 'react';

type useConsultDetailProps = {
  medicalSpecialities?: MedicalSpecialityEntity[];
  chatListData?: FetchChatListResponseData;
  chatRoomData?: FetchChatRoomResponseData;
};

export const useConsultDetail = (props: useConsultDetailProps) => {
  const { chatListData, chatRoomData } = props;
  const [isOpenReConsultConfirmModal, setIsOpenReConsultConfirmModal] = useState(false);
  const [isOpenRoomReopenModal, setIsOpenRoomReopenModal] = useState(false);
  const [isOpenChatEditModal, setIsOpenChatEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenDoctorDetailModal, setIsOpenDoctorDetailModal] = useState(false);
  const [isOpenGroupMemberModal, setIsOpenGroupMemberModal] = useState(false);
  const [isOpenReplyRequestModal, setIsOpenReplyRequestModal] = useState(false);
  const [isOpenTempResolveRequestModal, setIsOpenTempResolveRequestModal] = useState(false);
  const [isOpenCloseChatRoomModal, setIsOpenCloseChatRoomModal] = useState(false);
  const [isOpenResolveChatRoomModal, setIsOpenResolveChatRoomModal] = useState(false);
  const [isOpenReConsultSuggestionModal, setIsOpenReConsultSuggestionModal] = useState(false);
  const setIsChatRoomSelected = useSetAtom(isChatRoomSelectedState);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { accountId } = useToken();
  const chatListRef = useRef<HTMLDivElement | null>(null);
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { activateChatRoom } = usePostActivateChatRoom();

  const getExperienceYear = useCallback((year: number) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const passedYear = currentYear - year;

    return passedYear + 1;
  }, []);

  const chatListDataWithDisplayName = useMemo(() => {
    if (chatListData && chatRoomData) {
      return chatListData.map((c) => {
        if (chatRoomData.me?.account_id === c.account_id) {
          if (chatRoomData.me.first_name) {
            return { ...c, displayName: chatRoomData.me.last_name + ' ' + chatRoomData.me.first_name + '先生' };
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
        } else if (
          chatRoomData.members &&
          chatRoomData.members.length > 0 &&
          chatRoomData.members[0].account_id === c.account_id
        ) {
          if (chatRoomData.members[0].first_name) {
            return {
              ...c,
              displayName: chatRoomData.members[0].last_name + ' ' + chatRoomData.members[0].first_name + '先生',
            };
          } else if (chatRoomData.members[0].speciality_1) {
            return {
              ...c,
              displayName:
                getMedicalSpecialityName(chatRoomData.members[0].speciality_1) +
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
  }, [chatListData, chatRoomData, getExperienceYear, getMedicalSpecialityName]);

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
    selectedImage,
    setSelectedImage,
    setIsChatRoomSelected,
    getMedicalSpecialityName,
    getExperienceYear,
    activateChatRoom,
  };
};
