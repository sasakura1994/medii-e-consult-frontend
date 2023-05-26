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
  const [messageIdForCommentsModal, setMessageIdForCommentsModal] = useState<
    number | undefined
  >();
  const [isCommentsModalShown, setIsCommentsModalShown] = useState(false);
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
    setIsCommentsModalShown(true);
    setMessageIdForCommentsModal(undefined);
    setMessageForCommentsModal(consultExample?.background ?? '');
  }, [consultExample?.background]);

  const openCommentsModalForMessage = useCallback(
    (consultExampleMessage: ConsultExampleMessageEntity) => {
      setIsCommentsModalShown(true);
      setMessageIdForCommentsModal(consultExampleMessage.uid);
      setMessageForCommentsModal(consultExampleMessage.message);
    },
    []
  );

  const closeCommentsModal = useCallback(() => {
    setIsCommentsModalShown(false);
    setMessageIdForCommentsModal(undefined);
  }, []);

  return {
    closeCommentForm,
    closeCommentsModal,
    commentFormMessage,
    consultExample,
    messageIdForCommentsModal,
    consultExampleMessageIdForComment,
    consultExampleMessages,
    isCommentsModalShown,
    messageForCommentsModal,
    openCommentsModal,
    openCommentsModalForMessage,
    showCommentForm,
    showCommentFormForMessage,
  };
};
