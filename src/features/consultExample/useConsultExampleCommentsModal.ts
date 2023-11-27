import { useFetchConsultExampleComments } from '@/hooks/api/consultExample/useFetchConsultExampleComments';
import { useConsultExampleCommentModal } from './useConsultExampleCommentModal';
import { useCallback, useMemo } from 'react';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';

export const useConsultExampleCommentsModal = (consultExampleId: string, consultExampleMessageId?: number) => {
  const consultExampleCommentModal = useConsultExampleCommentModal(consultExampleId);
  const { createComment, createCommentForMessage } = consultExampleCommentModal;
  const { data: fetchConsultExampleCommentsResponseData, mutate: mutateFetchConsultExampleComments } =
    useFetchConsultExampleComments(consultExampleId, consultExampleMessageId);
  const { comments: consultExampleComments } = fetchConsultExampleCommentsResponseData ?? {};
  const { data: consultExampleMessages } = useFetchConsultExampleMessages(consultExampleId);

  const consultExampleMessage = useMemo(
    () =>
      consultExampleMessageId ? consultExampleMessages?.find((m) => m.uid === consultExampleMessageId) : undefined,
    [consultExampleMessageId, consultExampleMessages]
  );

  const createCommentAndMutate = useCallback(async () => {
    const result = await createComment();
    if (!result) {
      return;
    }

    mutateFetchConsultExampleComments();
  }, [createComment, mutateFetchConsultExampleComments]);

  const createCommentForMessageAndMutate = useCallback(async () => {
    const result = await createCommentForMessage(consultExampleMessageId ?? 0);
    if (!result) {
      return;
    }

    mutateFetchConsultExampleComments();
  }, [consultExampleMessageId, createCommentForMessage, mutateFetchConsultExampleComments]);

  return {
    ...consultExampleCommentModal,
    consultExampleComments,
    consultExampleMessage,
    createCommentAndMutate,
    createCommentForMessageAndMutate,
  };
};
