import { useFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback, useState } from 'react';
import { CreateConsultExampleCommentData } from './ConsultExampleCommentModal';
import { usePostConsultExampleComment } from '@/hooks/api/consultExample/usePostConsultExampleComment';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';

export const useConsultExamplePage = (id: string) => {
  const [commentFormMessage, setCommentFormMessage] = useState('');
  const [
    consultExampleMessageIdForComment,
    setConsultExampleMessageIdForComment,
  ] = useState(0);
  /** 閉じている場合はundefined。0の場合は事例自体のコメント  */
  const [messageIdForCommentsModal, setMessageIdForCommentsModal] = useState<
    number | undefined
  >();
  const [messageForCommentsModal, setMessageForCommentsModal] = useState('');
  const [isCommentSending, setIsCommentSending] = useState(false);

  const { data: consultExample, mutate: mutateConsultExample } =
    useFetchConsultExample(id);
  const { data: consultExampleMessages, mutate: mutateConsultExampleMessages } =
    useFetchConsultExampleMessages(id);
  const { postConsultExampleComment } = usePostConsultExampleComment();

  const showCommentForm = useCallback(
    () => setCommentFormMessage(consultExample?.background ?? ''),
    [consultExample]
  );

  const closeCommentForm = useCallback(() => {
    setCommentFormMessage('');
    setConsultExampleMessageIdForComment(0);
  }, []);

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

  const showCommentFormForMessage = useCallback(
    (consultExampleMessage: ConsultExampleMessageEntity) => {
      setCommentFormMessage(consultExampleMessage.message);
      setConsultExampleMessageIdForComment(consultExampleMessage.uid);
    },
    []
  );

  const createCommentForMessage = useCallback(
    async (data: CreateConsultExampleCommentData) => {
      setIsCommentSending(true);

      const response = await postConsultExampleComment({
        ...data,
        consultExampleId: id,
        consultExampleMessageId: consultExampleMessageIdForComment,
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
      setConsultExampleMessageIdForComment(0);
      mutateConsultExample();
      mutateConsultExampleMessages();
    },
    [
      consultExampleMessageIdForComment,
      id,
      mutateConsultExample,
      mutateConsultExampleMessages,
      postConsultExampleComment,
    ]
  );

  const openCommentsModal = useCallback(() => {
    setMessageIdForCommentsModal(0);
    setMessageForCommentsModal(consultExample?.background ?? '');
  }, [consultExample?.background]);

  const closeCommentsModal = useCallback(() => {
    setMessageIdForCommentsModal(undefined);
  }, []);

  return {
    closeCommentForm,
    closeCommentsModal,
    commentFormMessage,
    consultExample,
    consultExampleMessageIdForComment,
    consultExampleMessages,
    createComment,
    createCommentForMessage,
    isCommentSending,
    messageIdForCommentsModal,
    messageForCommentsModal,
    openCommentsModal,
    showCommentForm,
    showCommentFormForMessage,
  };
};
