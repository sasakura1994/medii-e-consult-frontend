import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

export type ChatData = {
  account_id: string;
  chat_message_id: string;
  content_type: string;
  created_date: string;
  deleted: boolean;
  file_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  message: string;
  modified: number;
  uid: number;
  unread_count: number;
};

export type FetchChatListResponseData = ChatData[];

export const useFetchChatList = (chatRoomId?: string) => {
  const { error, data, mutate } =
    useAuthenticatedSWR<FetchChatListResponseData>(
      chatRoomId ? `/chat_message/chat_list?chat_room_id=${chatRoomId}` : null
    );

  return {
    error,
    mutate,
    data,
  };
};
