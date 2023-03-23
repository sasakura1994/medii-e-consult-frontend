import { NewChatRoomEntity } from '@/types/entities/chat/NewChatRoomEntity';
import React from 'react';

export const useNewChatRoom = () => {
  const [mode, setMode] = React.useState<'input' | 'confirm'>('input');
  const [formData, setFormData] = React.useState<NewChatRoomEntity>({
    room_type: 'FREE',
  });

  return { formData, mode, setFormData };
};
