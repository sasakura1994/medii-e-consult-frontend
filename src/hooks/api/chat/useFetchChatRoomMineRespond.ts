import { useAuthenticatedSWR } from '@/hooks/network/useAuthenticatedSWR';

type UseFetchChatRoomMineRespondProps = {
  limit?: number;
};

export type ChatRoomMineRespondEntity = {
  chat_room_id: string;
  status: string;
  last_updated_date: string;
  latest_message: string;
  room_type: string;
  title: string;
  target_speciality: string;
  attending_doctor_name: string;
  attending_group_name: string;
  unread_count: number;
};

type FetchChatRoomMineRespondResponseData = {
  next_token: string;
  rooms: ChatRoomMineRespondEntity[];
};

export const useFetchChatRoomMineRespond = (
  props: UseFetchChatRoomMineRespondProps
) => {
  const { limit } = props;
  const { error, data, mutate } =
    useAuthenticatedSWR<FetchChatRoomMineRespondResponseData>(
      `/chat_room/mine/respond${limit && '?limit=' + limit}`
    );

  return {
    error,
    mutate,
    data,
  };
};
