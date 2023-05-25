import { useConsultExampleActions } from '@/hooks/api/consultExample/useConsultExampleActions';
import { useFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback, useState } from 'react';
import { CreateConsultExampleCommentData } from './ConsultExampleCommentModal';
import { usePostConsultExampleComment } from '@/hooks/api/consultExample/usePostConsultExampleComment';

export const useConsultExamplePage = (id: string) => {
  const [commentFormMessage, setCommentFormMessage] = useState('');
  const [isCommentSending, setIsCommentSending] = useState(false);

  const { data: consultExample, mutate: mutateConsultExample } =
    useFetchConsultExample(id);
  const { data: consultExampleMessages, mutate: mutateConsultExampleMessages } =
    useFetchConsultExampleMessages(id);
  const { like, likeMessage, unlike, unlikeMessage } =
    useConsultExampleActions();
  const { postConsultExampleComment } = usePostConsultExampleComment();

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

  const showCommentForm = useCallback(
    () => setCommentFormMessage(consultExample?.background ?? ''),
    [consultExample]
  );

  const closeCommentForm = useCallback(() => setCommentFormMessage(''), []);

  const createComment = useCallback(
    async (data: CreateConsultExampleCommentData) => {
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
        return;
      }

      setCommentFormMessage('');
      mutateConsultExample();
    },
    [id, mutateConsultExample, postConsultExampleComment]
  );

  return {
    closeCommentForm,
    commentFormMessage,
    consultExample,
    consultExampleMessages,
    createComment,
    likeAndMutate,
    likeMessageAndMutate,
    isCommentSending,
    showCommentForm,
    unlikeAndMutate,
    unlikeMessageAndMutate,
  };
};
