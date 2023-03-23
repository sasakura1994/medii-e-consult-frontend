import { ChatRoomGender, ChatRoomType } from './ChatRoomEntity';

export type NewChatRoomEntity = {
  room_type: ChatRoomType;
  gender: ChatRoomGender;
  age?: number;
};
