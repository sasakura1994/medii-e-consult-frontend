import React from 'react';
import { render, screen } from '@testing-library/react';
import { OtherChat } from '../OtherChat';
import { ChatRoomEntity } from '@/types/entities/chat/ChatRoomEntity';
import { ChatData } from '@/hooks/api/chat/useFetchChatList';

const chatRoom: ChatRoomEntity = {
  chat_room_id: 'chatroomid',
  owner_account_id: 'me',
  status: 'ACTIVE',
  title: 'title',
  content: 'content',
  latest_message_uid: 1,
  read_until: 1,
  latest_message: '',
  room_type: 'FREE',
  target_speciality: 'ALLERGY',
  disease_name: 'disease',
  gender: 'man',
  gender_text: 'man',
  short_title: '',
  age: 20,
  member_name: 'name',
  resolve_requested_date: '2023-10-23 16:25:40',
  last_updated_date: '2023-10-23 16:25:40',
  dont_close: 0,
  group_id: null,
  is_real_name: false,
  created_date: '2023-10-23 16:25:40',
};

const chatData: ChatData = {
  account_id: 'accountid',
  chat_message_id: 'chatmessageid',
  content_type: '',
  created_date: '2023-10-23 16:25:40',
  deleted: false,
  file_id: '',
  file_name: '',
  file_path: '',
  file_size: 0,
  message: '',
  only_me: true,
  is_first: false,
  modified: 0,
  uid: 1,
  read_count: 0,
};

describe('OtherChat', () => {
  test('あなただけに表示されていますメッセージ', () => {
    render(
      <OtherChat
        chatData={{ ...chatData, displayName: 'name' }}
        chatRoomData={{
          chat_room: chatRoom,
          assigned_to_me: false,
          images: [],
          members: [],
          me: null,
        }}
        setSelectedImage={jest.fn()}
      />
    );

    expect(screen.queryByTestId('only-me')).toBeInTheDocument();
  });
});
