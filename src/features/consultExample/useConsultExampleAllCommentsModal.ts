import { useCallback, useMemo } from 'react';
import { useFetchConsultExampleMessages } from '@/hooks/api/consultExample/useFetchConsultExampleMessages';
import { useFetchConsultExampleAllComments } from '@/hooks/api/consultExample/useFetchConsultExampleAllComments';
import { ConsultExampleCommentEntity } from '@/types/entities/ConsultExampleCommentEntity';
import { ConsultExampleMessageEntity } from '@/types/entities/ConsultExampleMessageEntity';

export const useConsultExampleAllCommentsModal = (consultExampleId: string) => {
  const { data: fetchConsultExampleAllCommentsResponseData } = useFetchConsultExampleAllComments(consultExampleId);
  const { comments: consultExampleComments } = fetchConsultExampleAllCommentsResponseData ?? {};
  const { data: consultExampleMessages } = useFetchConsultExampleMessages(consultExampleId);

  const availableConsultExampleMessages = useMemo((): ConsultExampleMessageEntity[] => {
    if (!consultExampleComments || !consultExampleMessages) {
      return [];
    }
    const consultExampleMessageIds = consultExampleComments.map(
      (consultExampleComment) => consultExampleComment.example_message_id
    );
    return consultExampleMessages.filter((consultExampleMessage) =>
      consultExampleMessageIds.includes(consultExampleMessage.uid)
    );
  }, [consultExampleMessages, consultExampleComments]);

  const getCommentsForMessage = useCallback(
    (consultExampleMessageId: number): ConsultExampleCommentEntity[] => {
      if (!consultExampleComments) {
        return [];
      }
      return consultExampleComments.filter(
        (consultExampleComment) => consultExampleComment.example_message_id === consultExampleMessageId
      );
    },
    [consultExampleComments]
  );

  return {
    availableConsultExampleMessages,
    getCommentsForMessage,
  };
};
