import { useGetIsFollowUpAnswered } from '@/hooks/api/chat/useGetIsFollowUpAnswered';
import { useMarkFollowUpAnswered } from '@/hooks/api/chat/useMarkFollowUpAnswered';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

type Query = {
  chat_room_id?: string;
};

export const useFollowUpQuestionary = () => {
  const router = useRouter();
  const { chat_room_id: chatRoomId } = router.query as Query;
  const { answered, mutate, error: isFollowUpAnsweredError } = useGetIsFollowUpAnswered(chatRoomId);
  const { markFollowUpAnswered } = useMarkFollowUpAnswered();

  useEffect(() => {
    if (isFollowUpAnsweredError?.response?.status === 403) {
      router.push('/chat');
    }
  }, [isFollowUpAnsweredError, router]);

  const onSubmit = useCallback(async () => {
    if (!chatRoomId) {
      return;
    }
    const response = await markFollowUpAnswered(chatRoomId).catch((error) => {
      console.error(error);
      return null;
    });
    if (!response) {
      alert('エラーが発生しました');
      return;
    }

    mutate();
  }, [chatRoomId, markFollowUpAnswered, mutate]);

  return { answered, chatRoomId, onSubmit };
};
