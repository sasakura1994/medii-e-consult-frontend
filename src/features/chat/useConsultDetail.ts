import { chatState } from '@/globalStates/chat';
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
  fetchNewChatList: (uid: number) => void;
};

export const useConsultDetail = (props: useConsultDetailProps) => {
  const { chatListData, chatRoomData, fetchNewChatList } = props;
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
  const [isOpenAnnounce, setIsOpenAnnounce] = useState(false);
  const setChatGlobalState = useSetAtom(chatState);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { accountId } = useToken();
  const chatListRef = useRef<HTMLDivElement>(null);
  const { getMedicalSpecialityName } = useMedicalSpeciality();
  const { activateChatRoom } = usePostActivateChatRoom();
  const oldScrollHeightRef = useRef(0);

  const getExperienceYear = useCallback((year: number) => {
    const date = new Date();
    const currentYear = date.getFullYear();
    const passedYear = currentYear - year;

    return passedYear + 1;
  }, []);

  const chatListDataWithDisplayName = useMemo(() => {
    if (chatListData && chatRoomData) {
      return chatListData.map((c) => {
        // 自分の場合
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

  const isViewingAnnounce = useMemo(() => {
    if (chatRoomData && accountId) {
      return chatRoomData.chat_room.owner_account_id === accountId;
    }
    return false;
  }, [chatRoomData, accountId]);

  useEffect(() => {
    if (!chatListData) {
      return;
    }

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      if (target.scrollTop === 0) {
        // スクロールが一番上に来たら、一番上のメッセージのUIDを取得
        const topMessageUid = chatListData[0].uid;
        // スクロール位置を保存
        oldScrollHeightRef.current = target.scrollHeight;
        // fetchNewChatListを呼び出して新しいfromUidを設定する

        fetchNewChatList(topMessageUid);
      }
    };

    chatListRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      chatListRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [chatListData, chatRoomData, fetchNewChatList]);
  useEffect(() => {
    if (chatListRef.current) {
      const newScrollHeight = chatListRef.current.scrollHeight;
      const addedHeight = newScrollHeight - oldScrollHeightRef.current;
      // スクロール位置を差分だけ下に移動
      chatListRef.current.scrollTop += addedHeight;
      oldScrollHeightRef.current = newScrollHeight;
    }
  }, [chatListData, chatRoomData]);

  useEffect(() => {
    // チャットルームIDが変わったときに高さをリセット
    if (chatListRef.current) {
      oldScrollHeightRef.current = 0;
    }
  }, [chatRoomData?.chat_room.chat_room_id]);

  useEffect(() => {
    if (!chatRoomData) {
      return;
    }
    setIsOpenAnnounce(chatRoomData.members.length === 0);
  }, [chatRoomData]);

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
    isOpenAnnounce,
    setIsOpenAnnounce,
    isViewingAnnounce,
    selectedImage,
    setSelectedImage,
    setChatGlobalState,
    getMedicalSpecialityName,
    getExperienceYear,
    activateChatRoom,
  };
};
