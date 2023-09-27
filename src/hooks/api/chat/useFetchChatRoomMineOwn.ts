import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

type UseFetchChatRoomMineOwnProps = {
  limit?: number;
};

export type ChatRoomMineOwnEntity = {
  chat_room_id: string;
  status: string;
  last_updated_date: string;
  latest_message: string;
  room_type: string;
  title: string;
  target_specialities: string[];
  attending_doctor_names: string[];
  attending_group_name: string;
  unread_count: number;
};

export type FetchChatRoomMineOwnResponseData = {
  next_token: string;
  rooms: ChatRoomMineOwnEntity[];
};

export const useFetchChatRoomMineOwn = (props: UseFetchChatRoomMineOwnProps) => {
  const { limit } = props;
  const { error, data, mutate } = useAuthenticatedSWR<FetchChatRoomMineOwnResponseData>(
    `/chat_room/mine/own${limit && '?limit=' + limit}`
  );

  return {
    error,
    mutate,
    data,
  };
};
