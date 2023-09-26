import { FetchChatRoomMineOwnResponseData, useFetchChatRoomMineOwn } from '@/hooks/api/chat/useFetchChatRoomMineOwn';
import {
  FetchChatRoomMineRespondResponseData,
  useFetchChatRoomMineRespond,
} from '@/hooks/api/chat/useFetchChatRoomMineRespond';
import { useFetchMedicalSpecialities } from '@/hooks/api/medicalCategory/useFetchMedicalSpecialities';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useState, useMemo } from 'react';

type UseUserConsult = {
  activeTab: 'question' | 'answer';
  setActiveTab: React.Dispatch<React.SetStateAction<'question' | 'answer'>>;
  isOpenAllChatRoom: boolean;
  setIsOpenAllChatRoom: React.Dispatch<React.SetStateAction<boolean>>;
  mineOwnUnreadCount: number;
  mineRespondUnreadCount: number;
  medicalSpecialities: MedicalSpecialityEntity[] | undefined;
  chatRoomMineOwnData?: FetchChatRoomMineOwnResponseData;
  chatRoomMineRespondData?: FetchChatRoomMineRespondResponseData;
};

export const useUserConsult = (): UseUserConsult => {
  const [activeTab, setActiveTab] = useState<'question' | 'answer'>('question');
  const [isOpenAllChatRoom, setIsOpenAllChatRoom] = useState(false);
  const { data: chatRoomMineOwnData } = useFetchChatRoomMineOwn({
    limit: 100,
  });
  const { data: chatRoomMineRespondData } = useFetchChatRoomMineRespond({
    limit: 100,
  });
  const { medicalSpecialities } = useFetchMedicalSpecialities();

  const mineOwnUnreadCount = useMemo(() => {
    return (
      chatRoomMineOwnData?.rooms.reduce((totalUnreadCount, room) => {
        return totalUnreadCount + room.unread_count;
      }, 0) ?? 0
    );
  }, [chatRoomMineOwnData]);

  const mineRespondUnreadCount = useMemo(() => {
    return (
      chatRoomMineRespondData?.rooms.reduce((totalUnreadCount, room) => {
        return totalUnreadCount + room.unread_count;
      }, 0) ?? 0
    );
  }, [chatRoomMineRespondData]);
  return {
    activeTab,
    setActiveTab,
    isOpenAllChatRoom,
    setIsOpenAllChatRoom,
    mineOwnUnreadCount,
    mineRespondUnreadCount,
    medicalSpecialities,
    chatRoomMineOwnData,
    chatRoomMineRespondData,
  };
};
