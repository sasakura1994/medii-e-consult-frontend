export type ChatRoomType = 'FREE' | 'BY_NAME' | 'GROUP';

export type ChatRoomGender = 'man' | 'woman';

export type ChatRoomStatus = 'CREATED' | 'ACTIVE' | 'TEMP_RESOLVED' | 'RESOLVED' | 'CLOSED' | 'REOPEN';

export type ChatRoomEntity = {
  chat_room_id: string;
  owner_account_id: string;
  status: ChatRoomStatus;
  title: string;
  content: string;
  latest_message_uid: number;
  read_until: number;
  latest_message: string;
  room_type: ChatRoomType;
  target_speciality: string;
  disease_name: string;
  gender: ChatRoomGender;
  gender_text: string;
  short_title: string;
  age: number | null;
  member_name: string;
  resolve_requested_date: string;
  last_updated_date: string;
  dont_close: number;
  group_id: string | null;
  is_real_name: boolean;
};
