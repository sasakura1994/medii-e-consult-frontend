import { usePostChatRoomReOpen } from '@/hooks/api/chat/usePostChatRoomReOpen';
import { useState } from 'react';

export const useRoomReopenModal = () => {
  const [selectedReason, setSelectedReason] = useState<'unsolved' | 'thanks' | 'additional' | undefined>(undefined);
  const { reOpenChatRoom } = usePostChatRoomReOpen();

  return { selectedReason, setSelectedReason, reOpenChatRoom };
};
