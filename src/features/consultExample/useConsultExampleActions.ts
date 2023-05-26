import { useConsultExampleActionsApi } from '@/hooks/api/consultExample/useConsultExampleActionsApi';
import { mutateFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { mutateFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback, useState } from 'react';
import { CreateConsultExampleCommentData } from './ConsultExampleCommentModal';
import { usePostConsultExampleComment } from '@/hooks/api/consultExample/usePostConsultExampleComment';

export const useConsultExampleActions = (id: string) => {
  const [isCommentSending, setIsCommentSending] = useState(false);

  const { like, likeMessage, unlike, unlikeMessage } =
    useConsultExampleActionsApi();
  const { postConsultExampleComment } = usePostConsultExampleComment();

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

  const createCommentAndMutate = useCallback(
    async (data: CreateConsultExampleCommentData): Promise<boolean> => {
      setIsCommentSending(true);

      const response = await postConsultExampleComment({
        ...data,
        consultExampleId: id,
      }).catch((error) => {
        console.error(error);
        return null;
      });

      setIsCommentSending(false);

      if (!response) {
        alert('エラーが発生しました。');
        return false;
      }

      mutateFetchConsultExample(id);
      return true;
    },
    [id, postConsultExampleComment]
  );

  const createCommentForMessageAndMutate = useCallback(
    async (
      consultExampleMessageId: number,
      data: CreateConsultExampleCommentData
    ): Promise<boolean> => {
      setIsCommentSending(true);

      const response = await postConsultExampleComment({
        ...data,
        consultExampleId: id,
        consultExampleMessageId,
      }).catch((error) => {
        console.error(error);
        return null;
      });

      setIsCommentSending(false);

      if (!response) {
        alert('エラーが発生しました。');
        return false;
      }

      mutateFetchConsultExample(id);
      mutateFetchConsultExampleMessages(id);
      return true;
    },
    [id, postConsultExampleComment]
  );

  return {
    createCommentAndMutate,
    createCommentForMessageAndMutate,
    isCommentSending,
    likeAndMutate,
    likeMessageAndMutate,
    unlikeAndMutate,
    unlikeMessageAndMutate,
  };
};
