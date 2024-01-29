import { useFetchChatRoom } from '@/hooks/api/chat/useFetchChatRoom';
import { useGetIsFollowUpAnswered } from '@/hooks/api/chat/useGetIsFollowUpAnswered';
import { useMarkFollowUpAnswered } from '@/hooks/api/chat/useMarkFollowUpAnswered';
import { useFetchGroup } from '@/hooks/api/group/useFetchGroup';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';

type Query = {
  chat_room_id?: string;
};

export const useFollowUpQuestionary = () => {
  const router = useRouter();
  const { chat_room_id: chatRoomId } = router.query as Query;
  const { answered, mutate, error: isFollowUpAnsweredError } = useGetIsFollowUpAnswered(chatRoomId);
  const { markFollowUpAnswered } = useMarkFollowUpAnswered();
  const { data } = useFetchChatRoom(chatRoomId);
  const chatRoom = data?.chat_room;
  const { group } = useFetchGroup(chatRoom?.group_id ?? undefined);

  const targetName = useMemo(() => {
    if (!chatRoom) {
      return '';
    }

    if (chatRoom.room_type === 'GROUP') {
      return '';
    }

    const otherMember = data?.members.find((member) => member.account_id !== chatRoom.owner_account_id);
    if (!otherMember) {
      return '';
    }

    return `${otherMember.last_name} ${otherMember.first_name} 先生`;
  }, [chatRoom, data?.members]);

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

  return { answered, chatRoomId, onSubmit, chatRoom, group, targetName };
};
