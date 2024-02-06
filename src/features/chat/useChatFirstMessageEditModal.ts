import { useCallback, useState } from 'react';
import { ChatFirstMessageEditModalProps } from './ChatFirstMessageEditModal';
import { useAxios } from '@/hooks/network/useAxios';
import { toast } from 'react-toastify';

export const useChatFirstMessageEditModal = (props: ChatFirstMessageEditModalProps) => {
  const { chatRoomId, firstMessage, onClose, updateMessageMutate } = props;
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState(firstMessage.message);
  const { axios } = useAxios();

  const update = useCallback(async () => {
    const response = await axios.patch(`/chat_room/${chatRoomId}/update-first-message`, { message }).catch((error) => {
      console.error('error', error);
      setErrorMessage(error.response?.data?.message);
      return null;
    });
    if (!response) {
      return;
    }

    toast('更新しました');
    onClose();
    updateMessageMutate(firstMessage.uid, { ...firstMessage, message });
  }, [axios, chatRoomId, firstMessage, message, onClose, updateMessageMutate]);

  return { errorMessage, message, setMessage, update };
};
