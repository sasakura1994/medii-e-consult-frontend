import { useConsultExampleActions } from '@/hooks/api/consultExample/useConsultExampleActions';
import { useFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback } from 'react';

export const useConsultExamplePage = (id: string) => {
  const { data: consultExample, mutate: mutateConsultExample } =
    useFetchConsultExample(id);
  const { data: consultExampleMessages, mutate: mutateConsultExampleMessages } =
    useFetchConsultExampleMessages(id);
  const { like, likeMessage, unlike, unlikeMessage } =
    useConsultExampleActions();

  const likeAndMutate = useCallback(async () => {
    await like(id);
    mutateConsultExample();
  }, [id, like, mutateConsultExample]);

  const unlikeAndMutate = useCallback(async () => {
    await unlike(id);
    mutateConsultExample();
  }, [id, unlike, mutateConsultExample]);

  const likeMessageAndMutate = useCallback(
    async (consultExampleMessageId: number) => {
      await likeMessage(id, consultExampleMessageId);
      mutateConsultExample();
      mutateConsultExampleMessages();
    },
    [id, likeMessage, mutateConsultExample, mutateConsultExampleMessages]
  );

  const unlikeMessageAndMutate = useCallback(
    async (consultExampleMessageId: number) => {
      await unlikeMessage(id, consultExampleMessageId);
      mutateConsultExample();
      mutateConsultExampleMessages();
    },
    [unlikeMessage, id, mutateConsultExample, mutateConsultExampleMessages]
  );

  return {
    consultExample,
    consultExampleMessages,
    likeAndMutate,
    likeMessageAndMutate,
    unlikeAndMutate,
    unlikeMessageAndMutate,
  };
};
