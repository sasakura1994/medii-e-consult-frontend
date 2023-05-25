import { useConsultExampleActionsApi } from '@/hooks/api/consultExample/useConsultExampleActionsApi';
import { mutateFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { mutateFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback } from 'react';

export const useConsultExampleActions = (id: string) => {
  const { like, likeMessage, unlike, unlikeMessage } =
    useConsultExampleActionsApi();

  const likeAndMutate = useCallback(async () => {
    await like(id);
    mutateFetchConsultExample(id);
  }, [id, like]);

  const unlikeAndMutate = useCallback(async () => {
    await unlike(id);
    mutateFetchConsultExample(id);
  }, [id, unlike]);

  const likeMessageAndMutate = useCallback(
    async (consultExampleMessageId: number) => {
      await likeMessage(id, consultExampleMessageId);
      mutateFetchConsultExample(id);
      mutateFetchConsultExampleMessages(id);
    },
    [id, likeMessage]
  );

  const unlikeMessageAndMutate = useCallback(
    async (consultExampleMessageId: number) => {
      await unlikeMessage(id, consultExampleMessageId);
      mutateFetchConsultExample(id);
      mutateFetchConsultExampleMessages(id);
    },
    [unlikeMessage, id]
  );

  return {
    likeAndMutate,
    likeMessageAndMutate,
    unlikeAndMutate,
    unlikeMessageAndMutate,
  };
};
