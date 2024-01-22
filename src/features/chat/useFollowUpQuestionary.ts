import { useGetIsFollowUpAnswered } from '@/hooks/api/chat/useGetIsFollowUpAnswered';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type Query = {
  id: string;
};

export const useFollowUpQuestionary = () => {
  const router = useRouter();
  const { id } = router.query as Query;
  const { answered, error: isFollowUpAnsweredError } = useGetIsFollowUpAnswered(id);

  useEffect(() => {
    if (isFollowUpAnsweredError?.response?.status === 403) {
      router.push('/chat');
    }
  }, [isFollowUpAnsweredError, router]);

  return { answered, id };
};
