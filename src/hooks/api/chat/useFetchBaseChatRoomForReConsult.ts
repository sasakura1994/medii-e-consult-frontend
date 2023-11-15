import { useAxios } from '@/hooks/network/useAxios';
import { ChatMessageEntity } from '@/types/entities/chat/ChatMessageEntity';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { MedicalSpecialityEntity } from '@/types/entities/medicalSpecialityEntity';
import { useCallback } from 'react';

export type FetchBaseChatRoomForReConsultResponseData = {
  chat_room: ChatRoomEntity;
  file_messages: ChatMessageEntity[];
  medical_specialities: MedicalSpecialityEntity[];
  first_message: string;
};

export const useFetchBaseChatRoomForReConsult = () => {
  const { axios } = useAxios();

  const fetchBaseChatRoomForReConsult = useCallback(
    async (reConsultChatRoomId: string): Promise<FetchBaseChatRoomForReConsultResponseData | undefined> => {
      const response = await axios
        .get<FetchBaseChatRoomForReConsultResponseData>(`/chat_room/${reConsultChatRoomId}/for_re_consult`)
        .catch((error) => {
          console.error(error);
          return null;
        });
      return response?.data;
    },
    [axios]
  );

  return { fetchBaseChatRoomForReConsult };
};
