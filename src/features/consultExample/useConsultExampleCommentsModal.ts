import { useFetchConsultExampleComments } from '@/hooks/api/consultExample/useFetchConsultExampleComments';
import { useConsultExampleCommentModal } from './useConsultExampleCommentModal';
import { useCallback } from 'react';

export const useConsultExampleCommentsModal = (consultExampleId: string) => {
  const consultExampleCommentModal =
    useConsultExampleCommentModal(consultExampleId);
  const { createComment, createCommentForMessage } = consultExampleCommentModal;
  const {
    data: fetchConsultExampleCommentsResponseData,
    mutate: mutateFetchConsultExampleComments,
  } = useFetchConsultExampleComments(consultExampleId);
  const { comments: consultExampleComments } =
    fetchConsultExampleCommentsResponseData ?? {};

  const createCommentAndMutate = useCallback(async () => {
    const result = await createComment();
    if (!result) {
      return;
    }

    mutateFetchConsultExampleComments();
  }, [createComment, mutateFetchConsultExampleComments]);

  return {
    ...consultExampleCommentModal,
    consultExampleComments,
    createCommentAndMutate,
  };
};
