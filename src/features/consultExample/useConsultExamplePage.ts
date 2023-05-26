import { useFetchConsultExample } from '@/hooks/api/consultExample/useFetchConsultExample';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useCallback, useState } from 'react';
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

  const { data: consultExample } = useFetchConsultExample(id);
  const { data: consultExampleMessages } = useFetchConsultExampleMessages(id);

  const showCommentForm = useCallback(
    () => setCommentFormMessage(consultExample?.background ?? ''),
    [consultExample]
  );

  const closeCommentForm = useCallback(() => {
    setCommentFormMessage('');
    setConsultExampleMessageIdForComment(0);
  }, []);

  const showCommentFormForMessage = useCallback(
    (consultExampleMessage: ConsultExampleMessageEntity) => {
      setCommentFormMessage(consultExampleMessage.message);
      setConsultExampleMessageIdForComment(consultExampleMessage.uid);
    },
    []
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
    messageIdForCommentsModal,
    messageForCommentsModal,
    openCommentsModal,
    showCommentForm,
    showCommentFormForMessage,
  };
};
