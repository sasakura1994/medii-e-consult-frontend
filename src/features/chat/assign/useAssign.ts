import { useRouter } from 'next/router';
import {
  useFetchChatRoom,
  FetchChatRoomResponseData,
} from './../../../hooks/api/chat/useFetchChatRoom';
import React from 'react';
import { usePostAssign } from '@/hooks/api/chat/usePostAssign';

type Query = {
  id?: string;
};

export const useAssign = () => {
  const router = useRouter();
  const { id } = router.query as Query;

  const [isConfirming, setIsConfirming] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [isSending, setIsSending] = React.useState(false);

  const { assign: postAssign } = usePostAssign();
  const fetchChatRoomResult = useFetchChatRoom(id);
  const { data: fetchChatRoomResultData } = fetchChatRoomResult || {};
  const { chat_room: chatRoom, images } = fetchChatRoomResultData || {};

  React.useEffect(() => {
    if (!fetchChatRoomResultData) {
      return;
    }

    // 自身がアサインされてる場合はチャットページに飛ばす
    if (fetchChatRoomResultData.assigned_to_me) {
      router.push(`/chat?chat_room_id=${id}`);
      return;
    }
  }, [fetchChatRoomResultData]);

  const assign = React.useCallback(async () => {
    if (!id) {
      return;
    }
    if (isSending) {
      return;
    }
    setErrorMessage('');
    setIsSending(true);

    const response = await postAssign(id).catch((error) => {
      console.error(error);
      setErrorMessage('エラーが発生しました。');
      return null;
    });

    setIsSending(false);

    if (!response) {
      return;
    }
    if (response.data.code !== 1) {
      setErrorMessage(response?.data.message || 'エラーが発生しました。');
      return;
    }

    router.push(`/chat?chat_room_id=${id}`);
  }, [id]);

  return {
    assign,
    chatRoom,
    errorMessage,
    images,
    isConfirming,
    isSending,
    setIsConfirming,
  };
};