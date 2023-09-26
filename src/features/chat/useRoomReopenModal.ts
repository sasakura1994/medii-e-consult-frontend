import { usePostChatRoomReOpen } from '@/hooks/api/chat/usePostChatRoomReOpen';
import { useState } from 'react';

type useRoomReopenModalProps = {
  isChatRoomOwner?: boolean;
};

export const useRoomReopenModal = (props: useRoomReopenModalProps) => {
  const { isChatRoomOwner } = props;
  const [selectedReason, setSelectedReason] = useState<'unsolved' | 'thanks' | 'additional' | undefined>(
    isChatRoomOwner ? undefined : 'thanks'
  );
  const { reOpenChatRoom } = usePostChatRoomReOpen();

  return { selectedReason, setSelectedReason, reOpenChatRoom };
};
