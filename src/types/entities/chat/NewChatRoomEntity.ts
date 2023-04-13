import { ChatRoomGender, ChatRoomType } from './ChatRoomEntity';

export type NewChatRoomEntity = {
  room_type: ChatRoomType;
  target_doctor?: string;
  group_id?: string;
  gender: ChatRoomGender;
  age?: number;
  disease_name: string;
  first_message: string;
  publishment_accepted: boolean;
};
