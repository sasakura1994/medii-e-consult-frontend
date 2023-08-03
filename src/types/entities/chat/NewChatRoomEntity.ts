import { ChatRoomGender, ChatRoomType } from './ChatRoomEntity';

export type NewChatRoomEntity = {
  chat_room_id: string;
  room_type: ChatRoomType;
  target_doctor?: string;
  target_specialities: string[];
  group_id?: string;
  gender: ChatRoomGender;
  age?: number;
  disease_name: string;
  first_message: string;
  publishment_accepted: boolean;
};
